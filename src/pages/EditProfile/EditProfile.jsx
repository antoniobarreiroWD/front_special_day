import React, {useState, useEffect} from "react";
import {useParams, useLocation, useNavigate} from "react-router-dom";
import {Box, Button, Flex} from "@chakra-ui/react";
import profileService from "../../services/profile.service";
import PageWrapper from "../../components/PageWrapper/PageWrapper";

import {FormInput} from "../../components/FormControls/FormControls";

function EditProfile() {
    const {id} = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        email: "",
        username: "",
        name: "",
        firstName: "",
        lastName: "",
    });

    useEffect(() => {
        if (!location.state?.profile) {
            const loadProfile = async () => {
                try {
                    const loadedProfile = await profileService.getProfileById(id);
                    setProfile(loadedProfile);
                } catch (error) {
                    console.error("Error loading the profile", error);
                    navigate("/profile");
                }
            };
            loadProfile();
        } else {
            setProfile(location.state.profile);
        }
    }, [id, location.state, navigate]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setProfile((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await profileService.updateProfile(id, profile);
            navigate("/profile");
        } catch (error) {
            console.error("Error updating the profile", error);
        }
    };

    return (
        <PageWrapper>
            <Box as="form" onSubmit={handleSubmit}>
                <FormInput
                    label="Email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                />
                <FormInput
                    label="Username"
                    name="username"
                    value={profile.username}
                    onChange={handleChange}
                />
                <FormInput
                    label="Name"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                />
                <FormInput
                    label="First Name"
                    name="firstName"
                    value={profile.firstName}
                    onChange={handleChange}
                />
                <FormInput
                    label="Last Name"
                    name="lastName"
                    value={profile.lastName}
                    onChange={handleChange}
                />
                <Flex justify="flex-end">
                    <Button type="submit" colorScheme="blue">
                        Save
                    </Button>
                </Flex>
            </Box>
        </PageWrapper>
    );
}

export default EditProfile;
