import { useState } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import Painel from "./Painel";

const SENHA_CORRETA = import.meta.env.VITE_PASSWORD_ADMIN;

export default function Admin() {
  const [senha, setSenha] = useState("");
  const [autenticado, setAutenticado] = useState(false);
  const [erro, setErro] = useState(false);

  function entrar(e) {
    e.preventDefault();
    if (senha === SENHA_CORRETA) {
      setAutenticado(true);
      setErro(false);
    } else {
      setErro(true);
      setSenha("");
    }
  }

  if (!autenticado) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%)'
        }}
      >
        <Container>
          <div className="d-flex justify-content-center">
            <Card
              style={{
                maxWidth: '400px',
                width: '100%',
                border: '2px solid #d4af37',
                borderRadius: '15px',
                boxShadow: '0 8px 16px rgba(212, 175, 55, 0.2)'
              }}
            >
              <Card.Body className="p-4">
                <h2
                  className="text-center"
                  style={{ color: '#d4af37', fontWeight: 'bold', fontFamily: 'Georgia, serif' }}
                >
                  Painel Administrativo
                </h2>
                <p className="text-center text-secondary mb-4">
                  Digite a senha para acessar o painel
                </p>

                {erro && (
                  <Alert variant="danger" onClose={() => setErro(false)} dismissible>
                    Senha incorreta! Tente novamente.
                  </Alert>
                )}

                <Form onSubmit={entrar}>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: '#d4af37', fontWeight: 'bold' }}>
                      Senha
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Digite a senha"
                      value={senha}
                      onChange={e => setSenha(e.target.value)}
                      autoFocus
                    />
                  </Form.Group>
                  <Button
                    variant="warning"
                    type="submit"
                    className="w-100"
                    size="lg"
                  >
                    Entrar
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </Container>
      </div>
    );
  }

  return <Painel />;
}
