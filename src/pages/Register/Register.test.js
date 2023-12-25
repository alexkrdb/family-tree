import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import Login from "../Login/Login"
import Register from "./Register"
describe('Register component', () => {
  test('renders the registration form and redirects to login on successful submission', async () => {
    render(
      <MemoryRouter initialEntries={['/register']}>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login}/> {/* Add the actual path of your Login component */}
      </MemoryRouter>
    );

    // Simulate user input
    fireEvent.change(screen.getByLabelText(/adres email/i), { target: { value: 'testuser@example.com' } });
    fireEvent.change(screen.getByLabelText(/hasło/i), { target: { value: 'testpassword123' } });
    fireEvent.change(screen.getByLabelText(/imię/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/nazwisko/i), { target: { value: 'Doe' } });

    // Simulate button click
    fireEvent.click(screen.getByText(/zarejestruj się/i));

    // Wait for async actions to complete (e.g., Firebase registration)
    await waitFor(() => {
      // Check if the user is redirected to the login page
      expect(screen.getByTestId('login-page')).toBeInTheDocument(); // Replace 'login-page' with an actual data-testid on your login page
    });
  });
});
