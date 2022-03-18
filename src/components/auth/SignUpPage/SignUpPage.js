import useForm from "../../../hooks/useForm";
import { signUp } from "./apicalls";
import "./SignUpPage.css";


//TODO: handleChange multitype
//TODO: incluir imagen en formulario, adaptar llamada al api para multipart form data
//TODO: validación cruzada de contraseña y confirmación de contraseña
//TODO: BACK: subida de imagen con multer
//TODO: BACK: gestionar los errores de mongo (ej: username e email deben ser únicos)

function SignUpPage() {
  const {
    formData: userData,
    setFormData,
    handleChange,
  } = useForm({
    userName: "",
    name: "",
    email: "",
    password: "",
    phone: "",
    url: "",
    image: null,
    description: "",
  });

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    try {
      const result = await signUp(userData);
      const userId = result._id;
      console.log(userId);
    } catch (error) {
      console.log(error); //TODO: despachar un failure action
    }
  };

  const disabledButton =
    !userData.userName ||
    !userData.name ||
    !userData.email ||
    !userData.password ||
    !userData.passwordConfirm ||
    !userData.phone ||
    // !userData.url ||
    !userData.description;

  return (
    <form className="signup-form" encType="multipart/form" onSubmit={handleSubmit}>

      <label>
        Nombre de usuario
        <input
          type="text"
          className="block"
          name="userName"
          value={userData.userName}
          onChange={handleChange}
        />
      </label>

      <label>
        Nombre
        <input
          type="text"
          className="block"
          name="name"
          value={userData.name}
          onChange={handleChange}
        />
      </label>

      <label>
        Email
        <input
          type="email"
          className="block"
          name="email"
          value={userData.email}
          onChange={handleChange}
        />
      </label>
      <label>
        Contraseña
        <input
          type="password"
          className="block"
          name="password"
          value={userData.password}
          onChange={handleChange}
        />
      </label>
      <label>
        Confirmar contraseña
        <input
          type="password"
          className="block"
          name="passwordConfirm"
          value={userData.passwordConfirm}
          onChange={handleChange}
        />
      </label>
      {/* <div>
        ¿Que quieres hacer en Wallaclone?
        <label>
          <span className="block">Ofrecer un servicio</span>
          <input
            type="radio"
            className="block"
            name="offer"
            value="foo"
            checked={userData.offer === true}
            onChange={(ev) =>
              setFormValue((currentState) => ({
                ...currentState,
                [ev.target.name]: Boolean(ev.target.value),
              }))
            }
          />
        </label>
        <label>
          Buscar un servicio
          <input
            type="radio"
            className="block"
            name="offer"
            value=""
            // checked={userData.offer === false}
            onChange={(ev) =>
              setFormValue((currentState) => ({
                ...currentState,
                [ev.target.name]: Boolean(ev.target.value),
              }))
            }
          />
        </label>
      </div> */}
      <label>
        Teléfono
        <input
          type="text"
          className="block"
          name="phone"
          value={userData.phone}
          onChange={handleChange}
        />
      </label>

      <label>
        URL
        <input
          type="url"
          className="block"
          name="url"
          value={userData.url}
          onChange={handleChange}
        />
      </label>
      Cuéntanos algo de tí...
      <textarea
        className="block textarea"
        name="description"
        value={userData.description}
        onChange={handleChange}
      ></textarea>
      <label>
        Sube tu foto o una imagen que te identifique 
        <input type="file" name="image" /* ref={imageRef} */ />
      </label>
      <button type="submit" className="button" disabled={disabledButton}>
        Darme de alta
      </button>
    </form>
  );
}

export default SignUpPage;
