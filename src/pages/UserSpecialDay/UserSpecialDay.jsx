import React, { useState, useEffect } from "react";
import SpecialDayService from "../../services/specialDay.service";
import PageWrapper from "../../components/PageWrapper/PageWrapper";

const UserSpecialDay = () => {
  const [userSpecialDay, setUserSpecialDay] = useState(null);
  const [loading, setLoading] = useState(true);
  

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
          
         
        </div>
      ) : (
        <div>NO hay Special Day creado</div>
      )}
    </div>
    </PageWrapper>
  );
};

export default UserSpecialDay;
