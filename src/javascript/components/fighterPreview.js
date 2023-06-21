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
    fighterImage.style.width = '250px';
    fighterImage.style.height = '300px';

    const fighterName = createElement({ tagName: 'h1' });
    fighterName.textContent = name;

    const fighterHelth = createElement({ tagName: 'span' });
    fighterHelth.textContent = `Helth: ${health}`;

    const fighterDefense = createElement({ tagName: 'span' });
    fighterDefense.textContent = `Defense: ${defense}`;

    const fighterAttack = createElement({ tagName: 'span' });
    fighterAttack.textContent = `Attack: ${attack}`;
    [fighterName, fighterHelth, fighterDefense, fighterAttack].forEach(element => {
        const el = element;
        el.style.fontFamily = 'sans-serif';
        el.style.fontWeight = 600;
        el.style.color = 'white';
    });

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
