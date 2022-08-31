const collapsibleElements = document.getElementsByClassName("collapsible");

for (collapsibleElement of collapsibleElements) {
  const content = collapsibleElement.getElementsByClassName("collapsible__content")[0];
  applyStyles(content, {
    height: '0',
    width:'300px',
    overflow: 'hidden',
  });

  let button = collapsibleElement.getElementsByClassName("collapsible__button")[0];
  let collapseSpan = button.getElementsByClassName('collapsible__action--visible')[0];
  let expandSpan = button.getElementsByClassName ('collapsible__action--hidden')[0];
  collapseSpan.setAttribute("hidden", "");

  button.addEventListener("click", () => {
    button.setAttribute("disabled", "");

    var collapseAnim;
    if (collapseSpan.getAttribute("hidden") === "") {
      collapseAnim = verticalCollapse(content, '0', '150px');
    } else {
      collapseAnim = verticalCollapse(content, '150px', '0');
    }
     
    collapseAnim.onfinish = (event) =>{
      revertHiddenAttribute([collapseSpan, expandSpan]);
      button.removeAttribute("disabled");
    } 
  });
}

function revertHiddenAttribute(elements) {
  for (el of elements) {
    if (el.getAttribute("hidden") === "") {
      el.removeAttribute("hidden");
    } else {
      el.setAttribute("hidden", "");
    }
  }
}

function applyStyles(element, style) {
  for (const property in style) {
    element.style[property] = style[property];
  }
}

function verticalCollapse(element, startHeight, endHeight) {
  return currentAnimation = element.animate(
    [{ height: startHeight }, { height: endHeight }],
    {
      duration: 400,
      easing: 'linear',
      fill: 'forwards',
    },
  );
}