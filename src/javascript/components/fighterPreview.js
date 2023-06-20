import createElement from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
    const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
    const fighterElement = createElement({
        tagName: 'div',
        className: `fighter-preview___root ${positionClassName}`
    });

    // todo: show fighter info (image, name, health, etc.)
    if (!fighter) return fighterElement;

    const { name, health, defense, attack, source } = fighter;
    const fighterImage = createElement({ tagName: 'img' });
    fighterImage.src = source;
    fighterImage.alt = name;
    fighterImage.title = name;

    const fighterName = createElement({ tagName: 'h1' });
    fighterName.textContent = name;

    const fighterHelth = createElement({ tagName: 'p' });
    fighterHelth.textContent = `Helth${health}`;

    const fighterDefense = createElement({ tagName: 'p' });
    fighterDefense.textContent = `Defense${defense}`;

    const fighterAttack = createElement({ tagName: 'p' });
    fighterAttack.textContent = `Attack${attack}`;

    fighterElement.prepend(fighterName);
    fighterElement.append(fighterImage);
    fighterElement.append(fighterHelth);
    fighterElement.append(fighterDefense);
    fighterElement.append(fighterAttack);

    return fighterElement;
}

export function createFighterImage(fighter) {
    const { source, name } = fighter;
    const attributes = {
        src: source,
        title: name,
        alt: name
    };
    const imgElement = createElement({
        tagName: 'img',
        className: 'fighter-preview___img',
        attributes
    });

    return imgElement;
}
