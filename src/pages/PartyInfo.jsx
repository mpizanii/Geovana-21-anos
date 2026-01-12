import { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { BsCalendarDate, BsClock, BsPinMap, BsHouse } from "react-icons/bs";
import ModalConfirm from '../components/ModalConfirm';

const PartyInfo = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%)',
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      overflow: 'auto',
      alignItems: 'stretch'
    }}>
      <Container fluid className="p-0" style={{ display: 'flex', flex: 1 }}>
        <Row className="g-0 w-100">
          <Col xs={12} lg={6} className="bg-white d-flex align-items-center justify-content-center p-4 p-lg-5" style={{ minHeight: '50vh' }}>
            <div style={{ maxWidth: '500px', width: '100%' }}>
              <h1 className="text-center fw-bold mb-3 mb-lg-4" 
                  style={{ 
                    fontSize: 'clamp(2rem, 5vw, 3rem)', 
                    color: '#d4af37',
                    fontFamily: 'Georgia, serif'
                  }}>
                Geovana 21 anos!
              </h1>
              
              <div className="d-flex justify-content-center flex-column align-items-center" style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', lineHeight: '1.6' }}>
                <p className="text-secondary">
                    Cheguei aos 21!!!<br />
                    Prepare-se para muita música, comida boa e é claro, muita muita diversão.<br />
                    Sua presença é muito importante para mim, por isso confirme sua presença no botão abaixo e venha celebrar comigo!
                </p>
                <Button variant='outline-warning' className="mb-3" onClick={() => setShowModal(true)}>
                  Confirmar Presença
                </Button>
              </div>
              
              <ModalConfirm show={showModal} handleClose={() => setShowModal(false)} />
              
              <Card border="warning" className="shadow">
                <Card.Body className="p-3 p-lg-4">
                  <h3 className="text-center fw-bold mb-3 mb-lg-4" 
                      style={{ fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', color: '#d4af37' }}>
                    Informações da Festa
                  </h3>
                  
                  <div className="mb-2 p-2 p-lg-3 bg-light rounded d-flex align-items-center">
                    <BsCalendarDate style={{ color: '#d4af37', marginRight: '8px', flexShrink: 0 }} />
                    <div style={{ fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}>
                      <strong style={{ color: '#d4af37' }}>Data: </strong> 06 de fevereiro de 2026
                    </div>
                  </div>
                  <div className="mb-2 p-2 p-lg-3 bg-light rounded d-flex align-items-center">
                    <BsClock style={{ color: '#d4af37', marginRight: '8px', flexShrink: 0 }} />
                    <div style={{ fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}>
                      <strong style={{ color: '#d4af37' }}>Horário: </strong> 21:00
                    </div>
                  </div>
                  <div className="mb-2 p-2 p-lg-3 bg-light rounded d-flex align-items-center">
                    <BsPinMap style={{ color: '#d4af37', marginRight: '8px', flexShrink: 0 }} />
                    <div style={{ fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}>
                      <strong style={{ color: '#d4af37' }}>Local: </strong> 
                      <a 
                        href="https://www.google.com.br/maps/place/Sal%C3%A3o+Sonho+Real+Festas+e+Eventos/@-15.8734462,-48.0578922,18z/data=!4m16!1m9!3m8!1s0x935a2d6a3311210f:0xeefc531e03fb86a5!2sSal%C3%A3o+Sonho+Real+Festas+e+Eventos!8m2!3d-15.8734462!4d-48.0578922!9m1!1b1!16s%2Fg%2F11b7q1y1bb!3m5!1s0x935a2d6a3311210f:0xeefc531e03fb86a5!8m2!3d-15.8734462!4d-48.0578922!16s%2Fg%2F11b7q1y1bb?entry=ttu&g_ep=EgoyMDI2MDEwNy4wIKXMDSoASAFQAw%3D%3D"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ 
                          color: '#d4af37', 
                          textDecoration: 'underline',
                          cursor: 'pointer'
                        }}
                      >
                        Salão Sonho Real Festas e Eventos
                      </a>
                    </div>
                  </div>
                  <div className="p-2 p-lg-3 bg-light rounded d-flex align-items-center">
                    <BsHouse style={{ color: '#d4af37', marginRight: '8px', flexShrink: 0 }} />
                    <div style={{ fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}>
                      <strong style={{ color: '#d4af37' }}>Endereço: </strong> SMSE Conjunto 1 - Samambaia Sul
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Col>
          
          <Col xs={12} lg={6} 
               className="d-flex align-items-center justify-content-center p-4 p-lg-5"
               style={{ 
                 background: 'linear-gradient(135deg, #d4af37 0%, #f4d03f 100%)',
                 minHeight: '50vh'
               }}>
            <img 
              src='/Geovana.jpeg'
              alt="Aniversariante" 
              className="img-fluid rounded shadow-lg"
              style={{ 
                maxHeight: '80vh',
                maxWidth: '100%',
                objectFit: 'cover',
                border: '5px solid white'
              }}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PartyInfo;