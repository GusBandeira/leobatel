import React, { Component } from 'react';
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const CopyRight = styled.div`
  background-color: #f2f3f4;
  text-align: center;
  padding: 20px 0;

  svg{
    margin: 0 10px;
    cursor: pointer;
    opacity: 0.7;

    :hover{
      opacity: 1;
    }
  }
`

const SocialLink = styled.a`
  color: unset;
  :hover{
    color: unset;
  }
`

class Footer extends Component {
  state = {
    siteAmil: 'https://ogs-hom.amil.com.br/CanaisDigitais-PortalInstitucional'
  };

  render() {
    return (
      <footer>
          <CopyRight>
            <SocialLink href='http://facebook.com/leoclubebatel' target='_blank'>
              <FontAwesomeIcon icon={['fab', 'facebook']}  size='3x'/>
            </SocialLink>
            <SocialLink href='http://instagram.com/leoclubebatel' target='_blank'>
              <FontAwesomeIcon icon={['fab', 'instagram']} size='3x'/>
            </SocialLink>
            <SocialLink href='http://linkedin.com/company/leoclubebatel' target='_blank'>
              <FontAwesomeIcon icon={['fab', 'linkedin']}  size='3x'/>
            </SocialLink>
            <br/><br/>
            Copyright © 2018 - LEO Clube de Curitiba Batel <br/>
            Todos os direitos reservados.
          </CopyRight>
      </footer>
    );
  }
}

export default Footer;
