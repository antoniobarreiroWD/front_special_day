import React, { useState, useEffect } from "react";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Box,
    Button,
    Heading,
    Input,
    Flex,
} from "@chakra-ui/react";
import { useSpring, animated } from "react-spring";
import { AiFillDollarCircle } from "react-icons/ai";
import SpecialDayService from "../../services/specialDay.service";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import bgImage from "../../assets/special_day_1.jpg";

const FloatingDollars = ({ show }) => {
    const props = useSpring({
        from: { transform: "translateY(100%)", opacity: 0 },
        to: {
            transform: show ? "translateY(-100%)" : "translateY(100%)",
            opacity: show ? 1 : 0,
        },
        config: { duration: 7000 },
        reset: true,
    });

    return show ? (
        <animated.div style={{ ...props, position: "fixed", bottom: 20, right: 20 }}>
            <AiFillDollarCircle size="30px" color="green" />
        </animated.div>
    ) : null;
};

const GuestList = () => {
    const [userSpecialDay, setUserSpecialDay] = useState(null);
    const [newGuest, setNewGuest] = useState({ name: "", companion: "", gift: "", table: "" });
    const [guests, setGuests] = useState([]);
    const [editingGuest, setEditingGuest] = useState(null);
    const [specialDayId, setSpecialDayId] = useState(null);
    const [showDollars, setShowDollars] = useState(false);

    const fetchGuests = async () => {
        try {
            const specialDayData = await SpecialDayService.getUserSpecialDay();
            setGuests(specialDayData.guests || []);
            setSpecialDayId(specialDayData._id);
        } catch (error) {
            console.error("Error fetching guests:", error);
        }
    };

    useEffect(() => {
        fetchGuests();
    }, []);

    const handleAddGuest = async () => {
        try {
            const guestToAdd = {
                ...newGuest,
                gift: newGuest.gift !== "" ? parseInt(newGuest.gift) : null,
                table: newGuest.table !== "" ? parseInt(newGuest.table) : null,
            };
            const updatedSpecialDay = await SpecialDayService.addGuest({ guest: guestToAdd });
            setUserSpecialDay(updatedSpecialDay);
            setNewGuest({ name: "", companion: "", gift: "", table: "" });
            setShowDollars(true);
            setTimeout(() => setShowDollars(false), 7000);
            fetchGuests();
        } catch (error) {
            console.error("Error adding guest:", error);
        }
    };

    const handleEditGuest = (guest) => {
        setEditingGuest({ ...guest });
    };

    const handleSaveGuest = async () => {
        try {
            const updatedGuests = guests.map((guest) =>
                guest._id === editingGuest._id ? editingGuest : guest
            );
            await SpecialDayService.updateSpecialDay(specialDayId, { guests: updatedGuests });
            setGuests(updatedGuests);
            setEditingGuest(null);
        } catch (error) {
            console.error("Error updating guest:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditingGuest({ ...editingGuest, [name]: value });
    };

    const handleDeleteGuest = async (guestId) => {
        try {
            const updatedGuests = guests.filter((guest) => guest._id !== guestId);
            await SpecialDayService.updateSpecialDay(specialDayId, { guests: updatedGuests });
            setGuests(updatedGuests);
        } catch (error) {
            console.error("Error deleting guest:", error);
        }
    };

    return (
        <PageWrapper>
            <Box display="flex" flexDirection={{ base: "column", md: "row" }} justifyContent="center" alignItems="center">
                <Box
                    width={{ base: "100%", md: "300px" }}
                    height={{ base: "200px", md: "300px" }}
                    bgImage={`url(${bgImage})`}
                    bgSize="cover"
                    bgRepeat="no-repeat"
                    bgPosition="center"
                    marginX={{ base: "0", md: "10px" }}
                />
                <Box width={{ base: "100%", md: "auto" }} p="20px" borderRadius="10px" boxShadow="lg">
                    <Heading as="h2" size="xl" textAlign="center" mb="20px" color="pink.600">
                        Lista de Invitados
                    </Heading>
                    <Box mb="20px">
                        <Heading as="h3" size="md" mb="10px">
                            Añadir nuevo Invitado
                        </Heading>
                        <Flex align="center" gap="2" flexDirection={{ base: "column", md: "row" }}>
                            <Input
                                placeholder="Nombre"
                                width="full"
                                value={newGuest.name}
                                onChange={(e) => setNewGuest({ ...newGuest, name: e.target.value })}
                            />
                            <Input
                                placeholder="Acompañante"
                                width="full"
                                value={newGuest.companion}
                                onChange={(e) => setNewGuest({ ...newGuest, companion: e.target.value })}
                            />
                            <Input
                                placeholder="Regalo"
                                type="number"
                                width="full"
                                value={newGuest.gift}
                                onChange={(e) => setNewGuest({ ...newGuest, gift: e.target.value })}
                            />
                            <Input
                                placeholder="Mesa"
                                type="number"
                                width="full"
                                value={newGuest.table}
                                onChange={(e) => setNewGuest({ ...newGuest, table: e.target.value })}
                            />
                            <Button colorScheme="teal" width="full" onClick={handleAddGuest}>
                                Añadir Invitado
                            </Button>
                        </Flex>
                    </Box>
                    <TableContainer overflowX="auto">
                        <Table variant="simple">
                            <Thead>
                                <Tr>
                                    <Th>Nombre</Th>
                                    <Th>Acompañante</Th>
                                    <Th>Regalo</Th>
                                    <Th>Mesa</Th>
                                    <Th>Acciones</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {guests.map((guest) => (
                                    <Tr key={guest._id}>
                                        <Td>{guest.name}</Td>
                                        <Td>{guest.companion}</Td>
                                        {editingGuest && editingGuest._id === guest._id ? (
                                            <>
                                                <Td>
                                                    <Input
                                                        type="number"
                                                        name="gift"
                                                        width="full"
                                                        value={editingGuest.gift || ""}
                                                        onChange={handleChange}
                                                        placeholder="Regalo"
                                                    />
                                                </Td>
                                                <Td>
                                                    <Input
                                                        type="number"
                                                        name="table"
                                                        width="full"
                                                        value={editingGuest.table || ""}
                                                        onChange={handleChange}
                                                        placeholder="Mesa"
                                                    />
                                                </Td>
                                                <Td>
                                                    <Flex gap="2" flexDirection="column">
                                                        <Button colorScheme="blue" width="full" onClick={handleSaveGuest}>
                                                            Guardar
                                                        </Button>
                                                        <Button colorScheme="red" width="full" onClick={() => setEditingGuest(null)}>
                                                            Cancelar
                                                        </Button>
                                                    </Flex>
                                                </Td>
                                            </>
                                        ) : (
                                            <>
                                                <Td>{guest.gift !== null ? guest.gift : "Regalo"}</Td>
                                                <Td>{guest.table !== null ? guest.table : "Mesa"}</Td>
                                                <Td>
                                                    <Flex gap="2" flexDirection="column">
                                                        <Button colorScheme="teal" width="full" onClick={() => handleEditGuest(guest)}>
                                                            Editar
                                                        </Button>
                                                        <Button colorScheme="red" width="full" onClick={() => handleDeleteGuest(guest._id)}>
                                                            Eliminar
                                                        </Button>
                                                    </Flex>
                                                </Td>
                                            </>
                                        )}
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Box>
                <Box
                    width={{ base: "100%", md: "300px" }}
                    height={{ base: "200px", md: "300px" }}
                    bgImage={`url(${bgImage})`}
                    bgSize="cover"
                    bgRepeat="no-repeat"
                    bgPosition="center"
                    marginX={{ base: "0", md: "10px" }}
                />
            </Box>
            <FloatingDollars show={showDollars} />
        </PageWrapper>
    );
};

export default GuestList;
