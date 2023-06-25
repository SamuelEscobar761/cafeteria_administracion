import NavigateNextIcon  from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

const DateSelector = ({ currentDate, setCurrentDate, formatedDate }) => {
  const handleDateChange = (event) => {
    const selectedDate = new Date(event.target.value);
    setCurrentDate(selectedDate);
  };

  const goToPreviousDay = () => {
    const previousDay = new Date(currentDate);
    previousDay.setDate(previousDay.getDate() - 1);
    setCurrentDate(previousDay);
  };

  const goToNextDay = () => {
    const nextDay = new Date(currentDate);
    nextDay.setDate(nextDay.getDate() + 1);
    setCurrentDate(nextDay);
  };

  return (
    <div className="flex items-center justify-center space-x-4">
    <NavigateBeforeIcon onClick={goToPreviousDay}/>
    <input
        type="date"
        value={formatedDate}
        onChange={handleDateChange}
        className="border border-gray-300 rounded px-3 py-2"
    />
    <NavigateNextIcon onClick={goToNextDay}/>
    </div>

  );
};

export default DateSelector;
