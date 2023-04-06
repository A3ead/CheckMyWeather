
export default{
    methods:{
        findDay(inputData){
            let currentDate = ''
            if(Object.hasOwn(inputData,'date')){
                currentDate = inputData.date
            }else{
                currentDate = inputData.current.last_updated
            }
            console.log(currentDate)
            let currentDay = new Date(currentDate)
            console.log(currentDay)
            const currentDateFormated = this.formatDate( currentDay)
            let daysOfWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
            let currentDayOfWeek = daysOfWeek[currentDay.getDay()]
            return [currentDayOfWeek, currentDateFormated]
        },

        formatDate(InputDate){
            const yyyy = InputDate.getFullYear();
            let mm = InputDate.getMonth() + 1; // Months start at 0!
            let dd = InputDate.getDate();

            if (dd < 10) dd = '0' + dd;
            if (mm < 10) mm = '0' + mm;

            const formattedDate = dd + '.' + mm + '.' + yyyy;
            return formattedDate
        }
    }
}