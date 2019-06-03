import React, { Component } from 'react'


// Import Components
import { CoverImage } from '../components/Page/ImageFrame'
import NewsComponent from '../components/News/NewsComponent'

// Import Image
import friends from '../../images/friends.jpg'
import melvin from '../../images/MelvinJones.jpg'
import mutirao from '../../images/LEOCampanha.png'

// Import translations
import { translates }  from '../contexts/language/translations/translates'
import withLanguage from '../components/HOCs/withLanguage'


export class LEO extends Component {
    
    state = {
        about: []
    }
    
    componentDidMount(){
        const language = this.props.language
        const text = translates[`translation${language}`]
        this.setState({
            about: [
                {
                    type: 't',
                    content: text.LEO.title
                },
                {
                    type: "p",
                    content: "Para um bom entendimento do que é um LEO Clube, temos que citar o Lions Clube, e por consequência Melvin Jones, um empresário de uma companhia de seguros, que se reunia com um grupo de empresários para almoços e jantares. Esse grupo era apenas mais um dentre tantos outros que, naquela época, se dedicavam exclusivamente a promover os interesses financeiros dos seus associados. Devido à sua oferta limitada, esses grupos estavam fadados a desaparecer. Foi então que Melvin Jones, um líder empresarial com 38 anos na época, fez uma pergunta simples, que foi capaz de mudar o mundo: “E se esses homens que são bem-sucedidos devido à sua iniciativa, inteligência e ambição, pusessem seu talento para trabalhar em benefício de suas comunidades?” Assim, ele e mais vinte empresários fundaram, em 07 de junho de 1917, o Lions Clube, com o objetivo de promover os princípios de boa governança e boa cidadania e interessar-se ativamente pelo bem-estar cívico, cultural, social e moral da comunidade em que vive." 
                },
                {
                    type: "i",
                    photo: melvin,
                    name: 'Melvin Jones',
                    subtitle: 'Melvin Jones, fundador do Lions Clubs'
                },
                {
                    type: "p",
                    content: "Depois de 100 anos de ser fundado, o movimento de Lions Clube se espalhou pelo mundo e hoje são 46 mil Clubes em 206 países, sendo uma das maiores organizações internacional de clubes de serviço do mundo, voltada para serviços humanitários. O Lions Clube amplia sua missão de serviço nas comunidades locais e em todos os cantos do mundo, pois as necessidades são imensas e as ações as mais variadas, abrangendo desde a visão, saúde, juventude, idosos até o meio ambiente e auxílio humanitário para vítimas de catástrofes." 
                },
                {
                    type: "p",
                    content: "Já o LEO Clube foi fundado em 5 de dezembro de 1957 por Jim Graver, treinador de um time de baseball em Glenside na Pensilvânia, Estados Unidos. Jim Graver, juntamente com William Ernst, ambos sócios do Lions Clube de Glenside, falavam em iniciar um clube de serviço para estudantes do ginásio. Eles então pediram apoio dos demais sócios, os quais concordaram que um grupo de jovens seria uma boa ideia para propagar os ideais propostos por Melvin Jones." 
                },
                {
                    type: "p",
                    content: "Juntos, os 35 adolescentes formaram o primeiro LEO Clube no mundo, o LEO Clube da Abington High School. O grupo criou o acrônimo LEO, que significa Liderança, Experiência e Oportunidade. Pois com a Oportunidade em ingressar no movimento leoístico os jovens constroem amizades e sentem as recompensas do serviço comunitário. Com a Experiência, entendem como o trabalho em equipe, cooperação e colaboração podem produzir mudanças estimulantes na comunidade. E com a Liderança, desenvolvem habilidades como organizadores de projetos, gerenciadores de tempo e líderes de equipe." 
                },
                {
                    type: "p",
                    content: "Em 1964 já havia 27 LEO Clubes na Pensilvânia e um em Nova Iorque. Somente em 1967, a diretoria do Lions Clube International adotou o LEO Clube como programa oficial da associação, aberto a ambos os sexos, com o objetivo de oferecer aos jovens do mundo uma oportunidade de desenvolvimento e contribuição, individual e coletiva, como membros responsáveis da comunidade local, nacional e internacional." 
                },
                {
                    type: "p",
                    content: "Logo, Lions Clubes por todo o mundo começaram a aprender sobre o novo programa, e em 1970 já havia 918 LEO Clubes em 48 países. No Brasil, o primeiro LEO Clube foi fundado em 28 de agosto de 1969, LEO Clube Maceió-Lagoa, em Alagoas. Com o apoio e incentivo da diretoria do Colégio Sagrada Família, o Lions Clube reuniu um grupo de estudantes, quase que diariamente, para divulgar a filosofia do servir, levando os alunos a compreender e compartilhar dos problemas comunitários." 
                },
                {
                    type: "p",
                    content: "A partir da fundação do primeiro LEO Clube no Brasil, o programa se espalhou e hoje são cerca de 400 clubes e mais de 15 mil associados com o propósito de servir desinteressadamente." 
                },
                {
                    type: "i",
                    photo: mutirao,
                    name: 'Mutirao da Saude LEO',
                    subtitle: 'LEOs e Lions em campanha'
                },
                {
                    type: "p",
                    content: "A principal ação do LEO Clube são as campanhas e atividades prestadas à comunidade com o intuito de reunir forças em prol da assistência social à comunidade local. As campanhas que os LEO Clubes desenvolve vêm dos enfrentamentos sociais e das necessidades comunitárias, verificadas cotidianamente pelos próprios associados ou por cidadãos que recorrem ao clube, cujos trabalhos ajudam a modificar aquele cenário independente da existência do ente público. O trabalho é voluntário e parte do pressuposto de que o indivíduo munido desta responsabilidade atuará com seriedade nos trabalhos sociais, motivado pelo trabalho em grupo e pelo pensamento que ungiu suas próprias forças na busca pela solução dos problemas ali verificados." 
                },
                {
                    type: "p",
                    content: "Desta forma, os jovens do LEO Clube desenvolvem e mobilizam seus esforços na elaboração de projetos sociais até a execução propriamente dita. Campanhas podem abranger várias áreas de atuação. Cada localidade tem as suas necessidades sociais prioritárias, o que requer a atenção dos jovens líderes do LEO Clube para que atenda mais eficazmente aquelas que possam colaborar à altura." 
                },
                {
                    type: "p",
                    content: "Enquanto que para o Lions Clube a realização de atividades de serviço na comunidade é um fim, para o LEO Clube as atividades de serviço são o meio pelo qual os associados desenvolvem suas qualidades individuais." 
                },
            ],
        })
    }

  render() {
      const { state } = this
    return (
        <div className='page'>
          <CoverImage>
            <img src={friends} alt='AboutLEO' />
          </CoverImage>
          <NewsComponent news={state.about} />
        </div>
      )
    }
}

export default withLanguage(LEO)
