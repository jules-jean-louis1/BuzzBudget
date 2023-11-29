function FormattedDate({ dateString }) {
  const date = new Date(dateString);

  const monthNames = [
    "janv.",
    "févr.",
    "mars",
    "avr.",
    "mai",
    "juin",
    "juil.",
    "août",
    "sept.",
    "oct.",
    "nov.",
    "déc.",
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return <span>{`${day} ${monthNames[monthIndex]} ${year}`}</span>;
}

export default FormattedDate;
