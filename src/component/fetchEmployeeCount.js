const fetchEmployeeCount = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/employees/getall'); // Replace with your actual API endpoint
        const data = await response.json();
        
        // Assuming the response is directly the number, like `15`
        if (typeof data === 'number') {
            return data;
        } else {
            throw new Error('Unexpected API response format');
        }
    } catch (error) {
        console.error('Error fetching employee count:', error);
        return 0; // Return 0 in case of an error
    }
};

export default fetchEmployeeCount;
