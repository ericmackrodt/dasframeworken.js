// export function componentFactory(components) {
//     const subscriptions = {};
//     function send(subs, val) {
//         subs.forEach((f) => f.element[f.elProp] = val);
//     }
//     function bound(obj, oprop, ctrl, cprop) {
//         let subs = subscriptions[cprop];
//         if (!subs) {
//             subs = subscriptions[cprop] = [];
//         }

//         subs.push({ element: obj, elProp: oprop });
//         ctrl.onPropertyChanged = (name) => {
//             setTimeout(() => {
//                 send(subscriptions[name], ctrl[name]);
//             });
//         };
//     }

//     function inwardBinding(obj, ctrl, prop) {
//         obj.addEventListener('input', function (change) {
//             setTimeout(() => {
//                 const start = this.selectionStart;
//                 const end = this.selectionEnd;
//                 ctrl[prop] = change.target.value;
//                 this.setSelectionRange(start, end);
//             });
//         }, true);
//     }

//     function processElement(element, controller, resolve) {
//         const component = components[element.localName];
//         if (component && !element.innerHTML) {
//             element.innerHTML = component.metadata.template;
//             processElement(element, resolve(component), resolve);
//             return;
//         }

//         if (/^{{\w*}}$/g.test(element.innerText)) {
//             bound(element, 'innerText', controller, element.innerText.replace('{{', '').replace('}}', ''));
//             element.innerText = '';
//         }

//         const call = (key) => (arg) => controller[key](arg);

//         if (element.attributes && element.attributes.length) {
//             for (var i in element.attributes) {
//                 var attr = element.attributes[i];

//                 if (attr.name === 'on:click') { //localName
//                     var key = attr.value.replace('()', '');
//                     element.onclick = call(key);
//                 }

//                 if (attr.name === 'binding') {
//                     bound(element, 'value', controller, attr.value);
//                     inwardBinding(element, controller, attr.value);
//                 }
//             }
//         }

//         if (element.childNodes && element.childNodes.length) {
//             for (var i in element.childNodes) {
//                 processElement(element.childNodes[i], controller, resolve);
//             }
//         }
//     }

//     return {
//         processElement: processElement
//     };
// }