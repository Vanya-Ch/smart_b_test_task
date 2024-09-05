import React, { useEffect, useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { fetchUsers } from "../store/action-creators/user";

// Інтерфейс для користувача
interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
}

const UserList: React.FC = () => {
    const { users, error, loading } = useTypedSelector((state) => state.user);
    const dispatch = useDispatch();

    // Стани для фільтрів у вигляді об'єкта
    const [filters, setFilters] = useState({
        name: '',
        username: '',
        email: '',
        phone: ''
    });

    const tableBorder = {
        border: "1px solid black"
    }

    useEffect(() => {
        dispatch(fetchUsers() as any);
    }, []);

    // Обробник зміни фільтрів для всіх полів
    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

    // Мемоізація фільтрації для уникнення зайвих рендерів
    const filteredUsers = useMemo(() => {
        return users.filter((user: User) =>
            user.name.toLowerCase().includes(filters.name.toLowerCase()) &&
            user.username.toLowerCase().includes(filters.username.toLowerCase()) &&
            user.email.toLowerCase().includes(filters.email.toLowerCase()) &&
            user.phone.toLowerCase().includes(filters.phone.toLowerCase())
        );
    }, [users, filters]);

    if (loading) {
        return <h2>Loading...</h2>;
    }
    if (error) {
        return <h2>{error}</h2>;
    }

    return (
        <div>
            <table style={tableBorder} cellPadding="10">
                <thead>
                    <tr>
                        <th>
                            Name
                            <br />
                            <input 
                                type="text" 
                                name="name"
                                placeholder="Filter by name"
                                value={filters.name}
                                onChange={handleFilterChange}
                            />
                        </th>
                        <th>
                            Username
                            <br />
                            <input 
                                type="text" 
                                name="username"
                                placeholder="Filter by username"
                                value={filters.username}
                                onChange={handleFilterChange}
                            />
                        </th>
                        <th>
                            Email
                            <br />
                            <input 
                                type="text" 
                                name="email"
                                placeholder="Filter by email"
                                value={filters.email}
                                onChange={handleFilterChange}
                            />
                        </th>
                        <th>
                            Phone
                            <br />
                            <input 
                                type="text" 
                                name="phone"
                                placeholder="Filter by phone"
                                value={filters.phone}
                                onChange={handleFilterChange}
                            />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((user: User) => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
