import createElement from '../../helpers/domHelper';
import showModal from './modal';

export default function showWinnerModal(fighter) {
    // call showModal function
    const { name: title, source } = fighter;

    const bodyElement = createElement({ tagName: 'img' });
    bodyElement.src = source;
    bodyElement.alt = title;
    bodyElement.title = title;

    showModal({ title, bodyElement });
}
