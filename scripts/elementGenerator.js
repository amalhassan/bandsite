// function generates HTML elements, sets attributes such as classes, and appends children
const elementGenerator = (type, attributes, ...children) => {
    const element = document.createElement(type);
    let index = 0;
    for (index in attributes) {
        element.setAttribute(index, attributes[index]);
    }
    children.forEach(child => {
        if (typeof child === 'string') {
            element.appendChild(document.createTextNode(child));
        } else {
            element.appendChild(child);
        }
    })
    return element
}

export default elementGenerator;