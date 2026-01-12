import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, Modal, Badge, Alert } from 'react-bootstrap';
import { BsPersonPlus, BsTrash, BsCheckCircleFill, BsXCircleFill } from 'react-icons/bs';
import { supabase } from '../services/supabase';

export default function Painel() {
  const [convidados, setConvidados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [novoConvidado, setNovoConvidado] = useState({ nome: '' });
  const [filtro, setFiltro] = useState('todos'); // 'todos', 'confirmados', 'pendentes'
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    buscarConvidados();
  }, []);

  async function buscarConvidados() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('convidados')
        .select('*')
        .order('nome', { ascending: true });

      if (error) throw error;
      setConvidados(data || []);
    } catch (err) {
      console.error('Erro ao buscar convidados:', err);
      setError('Erro ao carregar convidados');
    } finally {
      setLoading(false);
    }
  }

  async function adicionarConvidado(e) {
    e.preventDefault();
    if (!novoConvidado.nome.trim()) {
      setError('Nome é obrigatório');
      return;
    }

    try {
      const { error } = await supabase
        .from('convidados')
        .insert([{
          nome: novoConvidado.nome.trim(),
          isConfirmed: false
        }]);

      if (error) throw error;

      setSuccess('Convidado adicionado com sucesso!');
      setNovoConvidado({ nome: '' });
      setShowModal(false);
      await buscarConvidados();
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Erro ao adicionar convidado:', err);
      setError('Erro ao adicionar convidado');
    }
  }

  async function removerConvidado(id, nome) {
    try {
      const { error } = await supabase
        .from('convidados')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setSuccess('Convidado removido com sucesso!');
      await buscarConvidados();
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Erro ao remover convidado:', err);
      setError('Erro ao remover convidado');
    }
  }

  const convidadosFiltrados = convidados.filter(c => {
    if (filtro === 'confirmados') return c.isConfirmed;
    if (filtro === 'pendentes') return !c.isConfirmed;
    return true;
  });

  const totalConvidados = convidados.length;
  const totalConfirmados = convidados.filter(c => c.isConfirmed).length;
  const totalPendentes = totalConvidados - totalConfirmados;

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%)',
      minHeight: '100vh',
      padding: '20px 0'
    }}>
      <Container>
        <div className="mb-4">
          <h1 style={{ color: '#d4af37', fontWeight: 'bold', fontFamily: 'Georgia, serif' }}>
            Painel de Convidados
          </h1>
          <p className="text-secondary">Gerencie os convidados da festa</p>
        </div>

        {success && (
          <Alert variant="success" onClose={() => setSuccess('')} dismissible>
            {success}
          </Alert>
        )}

        {error && (
          <Alert variant="danger" onClose={() => setError('')} dismissible>
            {error}
          </Alert>
        )}

        <Row className="mb-4">
          <Col md={4} className="mb-3">
            <Card className="h-100" style={{ borderTop: '3px solid #d4af37' }}>
              <Card.Body>
                <h3 className="mb-0" style={{ color: '#d4af37' }}>{totalConvidados}</h3>
                <p className="text-secondary mb-0">Total de Convidados</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-3">
            <Card className="h-100" style={{ borderTop: '3px solid #28a745' }}>
              <Card.Body>
                <h3 className="mb-0 text-success">{totalConfirmados}</h3>
                <p className="text-secondary mb-0">Confirmados</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-3">
            <Card className="h-100" style={{ borderTop: '3px solid #ffc107' }}>
              <Card.Body>
                <h3 className="mb-0 text-warning">{totalPendentes}</h3>
                <p className="text-secondary mb-0">Pendentes</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card style={{ border: '2px solid #d4af37' }}>
          <Card.Header className="bg-white d-flex justify-content-between align-items-center">
            <div>
              <h5 className="mb-0" style={{ color: '#d4af37' }}>Lista de Convidados</h5>
            </div>
            <Button 
              variant="warning" 
              size="sm"
              onClick={() => setShowModal(true)}
            >
              <BsPersonPlus className="me-2" />
              Adicionar Convidado
            </Button>
          </Card.Header>
          <Card.Body>
            <div className="mb-3 d-flex gap-2 flex-wrap">
              <Button
                variant={filtro === 'todos' ? 'warning' : 'outline-secondary'}
                size="sm"
                onClick={() => setFiltro('todos')}
              >
                Todos ({totalConvidados})
              </Button>
              <Button
                variant={filtro === 'confirmados' ? 'success' : 'outline-success'}
                size="sm"
                onClick={() => setFiltro('confirmados')}
              >
                Confirmados ({totalConfirmados})
              </Button>
              <Button
                variant={filtro === 'pendentes' ? 'warning' : 'outline-warning'}
                size="sm"
                onClick={() => setFiltro('pendentes')}
              >
                Pendentes ({totalPendentes})
              </Button>
            </div>

            {loading ? (
              <div className="text-center py-5">
                <p>Carregando...</p>
              </div>
            ) : convidadosFiltrados.length === 0 ? (
              <div className="text-center py-5">
                <p className="text-secondary">Nenhum convidado encontrado</p>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <Table striped hover responsive>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Status</th>
                      <th className="text-center">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {convidadosFiltrados.map(convidado => (
                      <tr key={convidado.id}>
                        <td>{convidado.nome}</td>
                        <td>
                          {convidado.isConfirmed ? (
                            <Badge bg="success" className="d-flex align-items-center gap-1" style={{ width: 'fit-content' }}>
                              <BsCheckCircleFill /> Confirmado
                            </Badge>
                          ) : (
                            <Badge bg="warning" text="dark" className="d-flex align-items-center gap-1" style={{ width: 'fit-content' }}>
                              <BsXCircleFill /> Pendente
                            </Badge>
                          )}
                        </td>
                        <td className="text-center">
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => removerConvidado(convidado.id, convidado.nome)}
                          >
                            <BsTrash />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
          </Card.Body>
        </Card>
      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton style={{ borderBottom: '2px solid #d4af37' }}>
          <Modal.Title style={{ color: '#d4af37' }}>Adicionar Convidado</Modal.Title>
        </Modal.Header>
        <Form onSubmit={adicionarConvidado}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: '#d4af37', fontWeight: 'bold' }}>
                Nome <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o nome do convidado"
                value={novoConvidado.nome}
                onChange={(e) => setNovoConvidado({ ...novoConvidado, nome: e.target.value })}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer style={{ borderTop: '2px solid #d4af37' }}>
            <Button variant="outline-secondary" onClick={() => setShowModal(false)}>
              Cancelar
            </Button>
            <Button variant="warning" type="submit">
              Adicionar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}
