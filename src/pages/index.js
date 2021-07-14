import { useState } from 'react';
import { AlurakutMenu, OrkutNostalgicIconSet, AlurakutProfileSidebarMenuDefault } from '../lib/AlurakutCommons';
import MainGrid from '../components/MainGrid';
import Box from '../components/Box';
import ProfileRelationsBoxWrapper from '../components/ProfileRelationsBoxWrapper';

function ProfileSideBar({ user }) {
  return (
    <Box as="aside">
      <img src={`https://github.com/${user}.png`} style={{ borderRadius: '8px' }} />
      <hr />
      <p>
        <a className="boxLink" target="_blank" href={`https://github.com/${user}`}>@{user}</a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>

  )
};

export default function Home() {
  const user = 'gsfzamai';
  const [comunidades, setComunidades] = useState([{
    id: '131313121',
    title: 'Alurakut',
    image: 'https://picsum.photos/200/300?'+(Math.floor(Math.random() * 101))
  },
  {
    id: '21312321',
    title: 'Quiça, uma palavra legal',
    image: 'https://picsum.photos/200/300?'+(Math.floor(Math.random() * 101))
  }
  ]);
  const comunidadesRenderizadas = comunidades.slice(0, 6);

  const pessoasFavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho'
  ]

  const pessoasFavoritasRenderizadas = pessoasFavoritas.slice(0, 6);

  return (
    <>
      <AlurakutMenu githubUser='gsfzamai' />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSideBar user={user} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo(a)
            </h1>

            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                const dadoFormulario = new FormData(event.target);

                const novaComunidade = {
                  id: new Date().toISOString,
                  title: dadoFormulario.get('title'),
                  image: !dadoFormulario.get('image') ? 'https://picsum.photos/200/300?'+(Math.floor(Math.random() * 101)) : dadoFormulario.get('image')
                }

                const comunidadesAtualizadas = [...comunidades, novaComunidade];

                setComunidades(comunidadesAtualizadas);
              }
              }
            >
              <div>
                <input
                  name="title"
                  placeholder="Qual o nome da sua comunidade?"
                  aria-label="Qual o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input
                  name="image"
                  placeholder="Coloque uma URL para usarmos de capa"
                  aria-label="Coloque uma URL para usarmos de capa"
                  type="text"
                />
              </div>
              <button>
                Criar Comunidade
              </button>
            </form>
          </Box>
        </div>
        <div className="profileRelationArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({pessoasFavoritas.length})
            </h2>
            <ul>
              {pessoasFavoritasRenderizadas.map((itemAtual) => {
                return (
                  <li key={itemAtual}>
                    <a target="_blank" href={`http://github.com/${itemAtual}`}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                )
              })}
            </ul>

          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidade ({comunidades.length})
            </h2>
            <ul>
              {comunidadesRenderizadas.map((itemAtual) => {
                return (
                  <li key={itemAtual}>
                    <a href={`users/${itemAtual}`} >
                      <img src={itemAtual.image} />
                      <span>{itemAtual.title}</span>
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
