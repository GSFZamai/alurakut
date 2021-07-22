import { useEffect, useState } from 'react';
import { AlurakutMenu, OrkutNostalgicIconSet, AlurakutProfileSidebarMenuDefault } from '../src/lib/AlurakutCommons';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import ProfileRelationsBoxWrapper from '../src/components/ProfileRelationsBoxWrapper';
import styled from 'styled-components';

const ContainerBotoes = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
`

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

function RightSideBox({ title, data }) {

  const limitedRender = data.slice(0, 6);

  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {title} ({data.length})
      </h2>
      <ul>
        {limitedRender.map((itemAtual) => {
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
  )
}

function RightSideSeguidores({ title, data }) {
  const [initialPosition, setInitialPosition] = useState(0);
  const [finalPosition, setFinalPosition] = useState(6);
  const limitedRender = data.slice(initialPosition, finalPosition);
  const total = data.length;
  /* const totalPaginas = Math.round(total/6); */

  function handleProximo() {
    if (finalPosition < total) {
      setInitialPosition((initialPosition + 6));
      setFinalPosition(finalPosition + 6)
    }
  }

  function handleVoltar() {
    if (initialPosition > 0) {
      setInitialPosition((initialPosition - 6));
      setFinalPosition((finalPosition - 6));
    }
  }

  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {title} ({total})
      </h2>
      <ul>
        {limitedRender.map((itemAtual) => {
          return (
            <li key={itemAtual.id}>
              <a target="_blank" href={`http://github.com/${itemAtual.login}`}>
                <img src={`https://github.com/${itemAtual.login}.png`} />
                <span>{itemAtual.login}</span>
              </a>
            </li>
          )
        })}
      </ul>
      <ContainerBotoes>
        {!(initialPosition <= 0) &&
          <button onClick={handleVoltar}>Anterior</button>
        }

        {!(finalPosition >= total) &&
          <button onClick={handleProximo}>Próxima</button>
        }
      </ContainerBotoes>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {
  const user = 'gsfzamai';
  const [seguindo, setSeguindo] = useState([])
  const [comunidades, setComunidades] = useState([{
    id: '131313121',
    title: 'Alurakut',
    image: 'https://picsum.photos/200/300?' + (Math.floor(Math.random() * 101))
  },
  {
    id: '21312321',
    title: 'Quiça, uma palavra legal',
    image: 'https://picsum.photos/200/300?' + (Math.floor(Math.random() * 101))
  }
  ]);
  const [seguidores, setSeguidores] = useState([]);

  const comunidadesRenderizadas = comunidades.slice(0, 6);

  useEffect(() => {
    fetch('https://api.github.com/users/GSFZamai/followers')
      .then(response => {
        return response.json();
      })
      .then(data => {
        setSeguidores(data);
      });

    fetch('https://api.github.com/users/GSFZamai/following')
      .then(response => {
        return response.json();
      })
      .then(data => {
        setSeguindo(data);
      });

    /* 
      curl 'https://graphql.datocms.com/' \
      -H 'Authorization: YOUR-API-TOKEN' \
      -H 'Content-Type: application/json' \
      -H 'Accept: application/json' \
      --data-binary '{ "query": "query { allPosts { title } }" }'
    */

    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '07ffd3eee7a7e3877ec40c3c8713fd',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        'query': `query {
          allComunities {
              id
              title
              imageurl
              creatorslug
            }
          }`
      })
    }).then(response => response.json())
      .then(respostaCompleta => {setComunidades(respostaCompleta.data.allComunities)})

  }, [])

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
                  title: dadoFormulario.get('title'),
                  imageurl: !dadoFormulario.get('image') ? 'https://picsum.photos/200/300?' + (Math.floor(Math.random() * 101)) : dadoFormulario.get('image'),
                  creatorslug: user
                }                

                fetch('/api/comunidades', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                  },
                  body: JSON.stringify(novaComunidade)
                })
                .then( async (response) => {
                  const comunidadeCriada = await response.json();
                  console.log(comunidadeCriada);
                  const comunidadesAtualizadas = [comunidadeCriada, ...comunidades];
                  setComunidades(comunidadesAtualizadas);
                })


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

          <RightSideSeguidores title="Pessoas que eu sigo" data={seguindo} />
          <RightSideSeguidores title="Pessoas que me seguem" data={seguidores} />

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidade ({comunidades.length})
            </h2>
            <ul>
              {comunidadesRenderizadas.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`users/${itemAtual.creatorslug}`} >
                      <img src={itemAtual.imageurl} />
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
