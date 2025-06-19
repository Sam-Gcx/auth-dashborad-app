import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { fetchUserActivities } from "../utils/mockApi";
import { useAuth } from "../context/AuthContext";
import { useSelector } from "react-redux";

const Container = styled.div`
  max-width: 800px;

  margin: 60px auto;

  padding: 32px;

  background: #fff;

  border-radius: 10px;

  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const NavLinks = styled.div`
  display: flex;

  gap: 20px;

  margin-bottom: 32px;
`;

const NavLinkButton = styled(Link)`
  padding: 10px 20px;

  background: #007acc;

  color: white;

  font-weight: 600;

  border-radius: 4px;

  text-decoration: none;

  text-align: center;

  &:hover {
    background: #005f99;
  }
`;

const Header = styled.div`
  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-bottom: 24px;
`;

const Title = styled.h2`
  margin: 0;
`;
const LogoutButton = styled.button`
  padding: 8px 16px;

  background: #007acc;

  color: white;

  font-weight: 600;

  border: none;

  border-radius: 4px;

  cursor: pointer;

  &:hover {
    background: #005f99;
  }
`;

const InfoCard = styled.div`
  background: #f1f5f9;

  padding: 20px;

  border-radius: 8px;

  margin-bottom: 32px;
`;

const InfoRow = styled.div`
  display: flex;

  margin-bottom: 12px;
`;

const Label = styled.p`
  font-weight: bold;

  width: 120px;

  margin: 0;
`;

const Value = styled.p`
  margin: 0;

  flex: 1;
`;

const ActivityLabel = styled.p`
  font-weight: bold;

  margin-bottom: 8px;

  margin-left: 20px;
`;

const ActivityList = styled.ul`
  list-style: none;

  padding: 0 0 0 20px;

  margin: 0;
`;

const ActivityItem = styled.li`
  padding: 12px 0;

  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

const Loading = styled.p`
  color: #888;

  margin-top: 10px;

  margin-left: 20px;
`;

const Dashboard = () => {
  const { user, logout } = useAuth();
  const role = useSelector((state) => state.userRole.role);
  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState([]);
  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    const fetchDate = async () => {
      const result = await fetchUserActivities();
      setActivities(result);
      setLoading(false);
    };
    fetchDate();
  }, []);
  return (
    <Container>
      <Header>
        <Title>Welcome to your Dashboard</Title>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </Header>
      <NavLinks>
        <NavLinkButton to="/user">User Page</NavLinkButton>
        {role === "admin" && (
          <NavLinkButton to="/admin">Admin Page</NavLinkButton>
        )}
      </NavLinks>
      <InfoCard>
        <InfoRow>
          <Label>Username:</Label>
          <Value>{user?.username}</Value>
        </InfoRow>
        <InfoRow>
          <Label>Role:</Label>
          <Value>{role}</Value>
        </InfoRow>
      </InfoCard>
      <ActivityLabel>Recent Activities</ActivityLabel>
      {loading ? (
        <Loading>Loading...</Loading>
      ) : (
        <ActivityList>
          {activities.map((item, i) => (
            <ActivityItem key={`${i}-${item}`}>{item}</ActivityItem>
          ))}
        </ActivityList>
      )}
    </Container>
  );
};

export default Dashboard;
