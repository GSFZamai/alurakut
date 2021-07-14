import { AlurakutMenu, OrkutNostalgicIconSet } from '../lib/AlurakutCommons';
import MainGrid from '../components/MainGrid';
import Box from '../components/Box';
import ProfileRelationsBoxWrapper from '../components/ProfileRelationsBoxWrapper';

function ProfileSideBar({ user }) {
  return (
    <Box>
      <img src={`https://github.com/${user}.png`} style={{ borderRadius: '8px' }} />
    </Box>
  )
};

export default function Home() {
  const user = 'gsfzamai';
  const pessoasFavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho'
  ]

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div classname="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSideBar user={user} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo(a)
            </h1>

            <OrkutNostalgicIconSet />
          </Box>
        </div>
        <div className="profileRelationArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade (10)
            </h2>
            <ul>
              {pessoasFavoritas.map((itemAtual) => {
               return ( <li>
                  <a href={`users/${itemAtual}`} key={itemAtual}>
                    <img src={`https://github.com/${itemAtual}.png`} />
                    <span>{itemAtual}</span>
                  </a>
                </li>
               )
              })}
            </ul>

          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}
