import './styles.css';
import handleFormSubmit from './helper/handleFormSubmit';

const submitBtn = document.querySelector('.form-container form button');

submitBtn.addEventListener('click', handleFormSubmit);
