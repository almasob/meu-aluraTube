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

export default function RegisterVideo() {
  const formCadastro = useForm({
    initialValues: { titulo: "Frost Punk", url: "https://youtube.." },
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
