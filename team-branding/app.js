const hexToRgb = function(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16)
          }
        : null;
};

const colourIsLight = function(hexColor = '#fff') {
    const colorRGB = hexToRgb(hexColor);
    const alpha = 1 - (0.299 * colorRGB.r + 0.587 * colorRGB.g + 0.114 * colorRGB.b) / 255;
    return alpha < 0.5;
};

const createMenuElements = function(parent = null, textColour = '#262626', menuItems = []) {
    menuItems.forEach(function(item, index) {
        const element = document.createElement('span');
        element.textContent = item;
        element.setAttribute('style', `border-bottom-color: ${textColour}`);
        if (index + 1 === 5) {
            element.setAttribute('class', 'menu-item active');
        } else {
            element.setAttribute('class', 'menu-item');
        }
        parent.appendChild(element);
    });
};

const container = document.getElementById('container');
for (var teamName in teamDetails) {
    const el = document.createElement('div');
    el.setAttribute('class', 'bar');
    const bgColour = teamDetails[teamName];
    const textColour = colourIsLight(bgColour) ? '#262626' : '#fff';
    el.setAttribute('style', `background-color: ${bgColour}; color: ${textColour}`);
    el.onclick = function() {
        const team = teamName;
        console.info(`Primary-color: ${bgColour} Font-color: ${textColour}`);
    };
    createMenuElements(el, textColour, [
        teamName,
        'Menu Item 1',
        'Menu Item 2',
        'Menu Item 3',
        'Active Menu Item',
        `Primary-color: ${bgColour}`,
        `Font-color: ${textColour}`
    ]);
    container.appendChild(el);
}
