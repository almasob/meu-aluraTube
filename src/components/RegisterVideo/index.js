import { createClient } from "@supabase/supabase-js";
import React from "react";
import { StyledRegisterVideo } from "./styles";

function useForm(propsDoForm) {
  const [values, setValues] = React.useState(propsDoForm.initialValues);
  return {
    values,
    handleChange: (evento) => {
      const value = evento.target.value;
      const name = evento.target.name;
      console.log(value);
      setValues({
        ...value,
        [name]: value,
      });
    },
    clearForm(){
        setValues({});
    }
  };
}

const PROJECT_URL = "https://eyxyxpivkvicmitlunuw.supabase.co"
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5eHl4cGl2a3ZpY21pdGx1bnV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgzNjE5NzMsImV4cCI6MTk4MzkzNzk3M30.Vdqtwjl-to9RmVyJinSGWlQ7lDEaVfDepcRLP7f7Pi8"
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

function getThumbnail(url) {
  return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`;
}

export default function RegisterVideo() {
  const formCadastro = useForm({
    initialValues: { titulo: "Frost Punk", url: "https://www.youtube.com/watch?v=QsqatJxAUtk" },
  });
  const [formVisivel, setFormVisivel] = React.useState(true);

  return (
    <StyledRegisterVideo>
      <button type="button" className="add-video" onClick={() => setFormVisivel(true)}>
        +
      </button>
      {formVisivel ? (
        <form
          onSubmit={(evento) => {
            evento.preventDefault();

            supabase.from("video").insert({
              title:formCadastro.values.titulo,
              url:formCadastro.values.url,
              thumb:getThumbnail(formCadastro.values.url),
              playlist:"jogos"
            })
            .then((a) =>{
              console.log(a)
            })
            .catch((err) => {
              console.log(err)
            });

            setFormVisivel(false);

            formCadastro.clearForm();
          }}
        >
          <div>
            <button
              className="close-modal"
              onClick={() => setFormVisivel(false)}
            >
              X
            </button>
            <input
              placeholder="titulo do video"
              value={formCadastro.values.titulo}
              onChange={formCadastro.handleChange}
              name="titulo"
            />
            <input
              placeholder="URL"
              value={formCadastro.values.url}
              onChange={formCadastro.handleChange}
              name="url"
            />
            <button type="submit">Cadastrar</button>
          </div>
        </form>
      ) : (
        false
      )}
    </StyledRegisterVideo>
  );
}
