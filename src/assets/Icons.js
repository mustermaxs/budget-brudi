function getIconPath(category)
{
    const categoryMapping = {
        "Media Electronics": "Entertainment",
        "Groceries": "Food",
        "Restaurant": "Restaurant",
        "Health": "Health",
        "Bills": "Bills",
        "Rent": "Rent",
        "Subscription": "Entertainment",
        "Transportation": "Transportation",
        "Work": "Work",
        "Salary": "Salary",
        "Food": "Groceries",
        "Savings": "Savings"
    };
    
    let iconPath = `../../assets/icons/icons_raw/${categoryMapping[category]}.png`;
    
    console.log(iconPath);
    return iconPath;

}

export default getIconPath;