import familyLesser from '../../images/familyLesser.jpg'
import familyChildrenLesser from '../../images/familyChildrenLesser.jpg'
import family2 from '../../images/family2.jpg'
import family3 from '../../images/family3.jpg'
import Crotalarias from '../../images/Crotalarias.jpg'

export const NewsListModel = [ 
    {
      name: 'Familia Souza',
      description: 'Uma grande família constituida por um casal nascido na decada de 80 e tres lindos filhos. Com o nome Souza, seus descendentes se orgulham cada vez mais por representar a família.',
      photo: familyLesser,
      link: '/news/1',
      subtitle: 'Saiba tudo que acontece com a família Souza e seu dia-a-dia: onde vivem, o que comem e como se reproduzem.',
      banner: family3
    },
    {
      name: 'Familia Medeiros',
      description: 'Uma bela família de imigrantes finlandeses, os Moderiros chegaram ao Brasil ainda novos, com sua filha recem nascida Kami, após descobrirem problemas de nascença no coração.',
      photo: familyChildrenLesser,
      link: '/news/2',
      subtitle: 'Toda a rotina da família Medeiros em sua nova casa no Brasil: Finlandeses no Rio de Janeiro.',
      banner: family2
    },
    {
      name: 'Plantação de Crotalárias',
      description: 'Nesta tarde de domingo, foi realizado o cultivo das Crotalárias para combate a dengue.',
      photo: Crotalarias,
      link: '/news/2',
      subtitle: 'Nesta tarde de domingo, foi realizado o cultivo das Crotalárias para combate a dengue.',
      banner: Crotalarias,
      coverCenter: '60% 60%'
    },
  ]