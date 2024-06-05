import React, { useState, useEffect } from "react";
import SpecialDayService from "../../services/specialDay.service";
import PageWrapper from "../../components/PageWrapper/PageWrapper";

const UserSpecialDay = () => {
  const [userSpecialDay, setUserSpecialDay] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newGuest, setNewGuest] = useState({ name: '', companion: '', gift: 1, table: 1 });
  const [newService, setNewService] = useState({ type: '', price: 0, status: true });

  useEffect(() => {
    const fetchUserSpecialDay = async () => {
      try {
        const specialDayData = await SpecialDayService.getUserSpecialDay();
        setUserSpecialDay(specialDayData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user special day:", error);
        setLoading(false);
      }
    };

    fetchUserSpecialDay();
  }, []);

  const handleAddGuest = async () => {
    try {
      const updatedSpecialDay = await SpecialDayService.addGuest({ guest: newGuest });
      setUserSpecialDay(updatedSpecialDay);
      setNewGuest({ name: '', companion: '', gift: 1, table: 1 });
    } catch (error) {
      console.error("Error adding guest:", error);
    }
  };

  const handleAddService = async () => {
    try {
      const updatedSpecialDay = await SpecialDayService.addService({ service: newService });
      setUserSpecialDay(updatedSpecialDay);
      setNewService({ type: '', price: 0, status: true });
    } catch (error) {
      console.error("Error adding service:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <PageWrapper>
    <div>
      <h2>Nuestro Special Day</h2>
      {userSpecialDay ? (
        <div>
          <p>Fecha: {new Date(userSpecialDay.date).toLocaleDateString()}</p>
          <p>Novia: {userSpecialDay.couple?.bride?.name}</p>
          <p>Novio: {userSpecialDay.couple?.groom?.name}</p>
          <p>Servicios:</p>
          <ul>
            {userSpecialDay.services?.map((service, index) => (
              <li key={index}>
                Tipo: {service.type}, Precio: {service.price}, Estado:{" "}
                {service.status ? "Active" : "Inactive"}
              </li>
            ))}
          </ul>
          <p>Invitados:</p>
          <ul>
            {userSpecialDay.guests?.map((guest, index) => (
              <li key={index}>
                Nombre: {guest.name}, Acompañante: {guest.companion}, Regalo:{" "}
                {guest.gift}, Mesa: {guest.table}
              </li>
            ))}
          </ul>
         
          <div>
            <h3>Añadir nuevo Servicio</h3>
            <input
              type="text"
              placeholder="Type"
              value={newService.type}
              onChange={(e) => setNewService({ ...newService, type: e.target.value })}
            />
            <input
              type="number"
              placeholder="Price"
              value={newService.price}
              onChange={(e) => setNewService({ ...newService, price: parseFloat(e.target.value) })}
            />
            <label>
              Estado:
              <select
                value={newService.status}
                onChange={(e) => setNewService({ ...newService, status: e.target.value === 'true' })}
              >
                <option value="true">Activo</option>
                <option value="false">Inactivo</option>
              </select>
            </label>
            <button onClick={handleAddService}>Añadir Servicio</button>
          </div>
        </div>
      ) : (
        <div>NO hay Special Day creado</div>
      )}
    </div>
    </PageWrapper>
  );
};

export default UserSpecialDay;
