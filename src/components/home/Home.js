import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAdverts } from "../../store/actions";
import { Link } from "react-router-dom";
import { loadAdvertsSelector, loadTagsSelector } from "../../store/selectors";
//imports Bea
import Header from "../layout/header";
import { defaultFilters, filterAdverts } from "./filters";
import CheckboxGroup from "../common/Checkbox";
import storage from "../../utils/storage";
import Slider from 'rc-slider';
import { loadTags } from "../../store/actions";
import FilterComp from "./FilterComponent";
import '../../index.css'
import { customtags } from "./provisional";
import CheckboxTags from "../common/Checkbox_Tags";

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const getFilters = () =>  storage.get('filters')  || defaultFilters;
const saveFilters = filters => storage.set('filters', filters) || defaultFilters;

function Home() {

  const [value, setValue] = React.useState ({name: '', offerAdvert: '', price: [] , tags: [], paymentMethod: [], photo: null, experience: []})
  const [filters, setFilters] = React.useState([]);

  const dispatch = useDispatch();

  const ads = useSelector(loadAdvertsSelector);
  //const tags = useSelector(loadTagsSelector);
  const tags = 'useSelector(loadTagsSelector)';

  useEffect(() => {
    saveFilters(filters);
    dispatch(loadAdverts());
    dispatch(loadTags());
  }, [tags]);
 
  var adverts = filterAdverts(ads, value)
  
  const handleChange = event => {
    console.log(event)
    setValue(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

 // const [formValue, setFormValue] = useState(initialFormValue);
  const handleSubmit = ev => {
    ev.preventDefault();
    setFilters(getFilters())
  };

  return (
    /*   TODO: refactorizar en componente ServicesList 
    */
    <>
    <Header change={handleChange} value={value}/>
      <br></br>
      <CheckboxTags value={value.tags} change={handleChange} options={customtags} name="tags"/>
      <div className="container">
      <div className="filters">
        <FilterComp submit={handleSubmit} change={handleChange} value={value} tag={ads}/>
        <br></br>
      </div>
      <div className="adverts">
      <ul className="wrapper"> 
        {adverts.length > 0 ? 
          adverts.map((advert) => (
            <li key={advert._id}>
              <Link to={`/adverts/${advert._id}`}>
                <div>
                  <p><strong>NOMBRE</strong>{advert.name}</p>
                  <p>{advert.offerAdvert}</p>
                  <p>{advert.description}</p>
                  <p>{advert.tags.join("")}</p>
                  <p>{advert.paymentMethod.join("")}</p>
                  <p>Experiencia: <strong>{advert.experience}</strong> años</p>
                  <img src={advert.image} alt={advert.name} />
                  <br></br>
                </div>
              </Link>
            </li>
        )): <p>no hay anuncios que mostrar :(</p>}
      </ul>
      </div>
      </div>
      </>
  );
}

export default Home;
