import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';


class Footer extends Component {
  state = {
    siteAmil: 'https://ogs-hom.amil.com.br/CanaisDigitais-PortalInstitucional'
  };

  render() {
    return (
      <footer>
          <div id="footer" className={`footer`}>
            <Container>
              <Row>
                <Col>
                  <nav className="footer__nav">
                    <h2
                      className="footer__nav__title"
                      style={{
                        cursor: 'pointer',
                        fontSize: '1rem',
                        fontWeight: 'bolder',
                        color: '#706F6F'
                      }}
                    >
                    <a className='footer__contact' href='#/contato' title='Fale conosco'>
                      Fale conosco
                    </a>
                    </h2>
                    <ul className="footer__nav__list">
                      <li className="footer__nav__item">
                        <a
                          href="http://static.amil.com.br/amil/pdf/codigo_conduta_uhg.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Acesse o Código de Conduta"
                        >
                          Código de conduta
                        </a>
                      </li>

                      <li className="footer__nav__item">
                        <a
                          className="tablet__hide"
                          href="#/politica-privacidade"
                          title="Acesse a Política de Privacidade"
                        >
                          Politica de Privacidade
                        </a>
                        <a
                          className="tablet__show"
                          href="#/politica-privacidade"
                          title="Acesse a Política de Privacidade"
                        >
                          Privacidade
                        </a>
                      </li>

                      <li className="footer__nav__item">
                        <a
                          className="tablet__show"
                          href="#/sobre-amil-dental"
                          title="Acesse a página Sobre a Amil Dental"
                        >
                          Sobre a Amil
                        </a>
                        <a
                          className="tablet__hide"
                          href="#/sobre-amil-dental"
                          title="Acesse a página Sobre a Amil Dental"
                        >
                          Sobre a Amil Dental
                        </a>
                      </li>
                    </ul>
                  </nav>
                </Col>
              </Row>

              <Row>
                <Col>
                  <section className="footer__logos">
                    <h2 className="footer__logos__title">Sites Amil</h2>
                    <ul className="footer__logos__list">
                      <li className="footer__logos__item">
                        <a
                          className="amil-logo"
                          href={this.state.siteAmil}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Visite o site da Amil"
                        >
                          <span>Amil</span>
                        </a>
                      </li>
                      <li className="footer__logos__item">
                        <a
                          className="amildental-logo"
                          href="http://www.conexaodentista.amildental.com.br/"
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Visite o site da Conexão Dentista"
                        >
                          <span>Amil Dental</span>
                        </a>
                      </li>
                    </ul>
                  </section>
                </Col>
              </Row>
            </Container>
            <section className="footer__legal">
              <Container>
                <div className="footer__ans">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="http://www.ans.gov.br/"
                    title="Visite a página da ANS"
                  >
                  </a>
                </div>

                <div className="footer__copyright">
                  <p>
                    <span>CNPJ 29.309.127/0001-79</span>
                    Copyright © 2007-2014, Amil Assistência Médica Internacional
                    S/A. Todos os direitos reservados.
                  </p>
                </div>

                <div className="footer__ans-number">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="http://www.ans.gov.br/"
                    title="Visite a página da ANS"
                  >
                    {/* <img src={imageANSnumero} /> */}
                  </a>
                </div>
              </Container>
            </section>
          </div>
      </footer>
    );
  }
}

export default Footer;
