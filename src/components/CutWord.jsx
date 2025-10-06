export default function CutWord({ title, length }) {
  if(title.length >= length) {
    return title.slice(0, length) + '...';
  }

  return title;
}
