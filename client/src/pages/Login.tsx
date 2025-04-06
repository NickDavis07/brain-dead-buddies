import { useState, type FormEvent, type ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Login = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10 mx-auto">
        <div style={{
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          borderRadius: '10px',
          border: '2px solid #3d9a40',
          width: '100%',
          margin: '0 auto'
        }}>
          <h2 style={{
            backgroundColor: 'rgba(20, 20, 20, 0.8)',
            color: '#ff5555',
            padding: '15px',
            margin: '0',
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',
            textAlign: 'center',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            borderBottom: '2px solid #3d9a40'
          }}>
            Login
          </h2>
          <div style={{ padding: '20px' }}>
            {data ? (
              <p style={{ color: '#3d9a40', textAlign: 'center' }}>
                Success! You may now head{' '}
                <Link to="/" style={{ color: '#ff5555', textDecoration: 'underline' }}>
                  back to the homepage
                </Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <div style={{ marginBottom: '15px' }}>
                  <input
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      padding: '12px',
                      borderRadius: '5px',
                      border: '1px solid #3d9a40',
                      width: '100%',
                      fontSize: '16px'
                    }}
                    placeholder="Your email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <input
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      padding: '12px',
                      borderRadius: '5px',
                      border: '1px solid #3d9a40',
                      width: '100%',
                      fontSize: '16px'
                    }}
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={formState.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#2c3e50',
                    color: 'white',
                    border: '1px solid #3d9a40',
                    borderRadius: '5px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    transition: 'background-color 0.3s'
                  }}
                  type="submit"
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#34495e'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2c3e50'}
                >
                  Submit
                </button>
              </form>
            )}

            {error && (
              <div style={{ 
                marginTop: '15px', 
                padding: '10px', 
                backgroundColor: 'rgba(220, 53, 69, 0.8)', 
                color: 'white',
                borderRadius: '5px',
                textAlign: 'center'
              }}>
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;