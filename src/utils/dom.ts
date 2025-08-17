export function fetchElementById<T extends HTMLElement>(
    id: string,
    expectedType: {new(): T}
): T | null {
  const element = document.getElementById(id);
  if (!element) {
    console.error(`Element with id ${id} not found`);
    return null;
  }

  if (!(element instanceof expectedType)) {
    console.error(`Element with id ${id} is not of type ${expectedType.name}`);
    return null;
  }
  
  return element;
}