import { Link } from "react-router-dom";
import "./LinkCard.css";

function LinkCard({title, href, icon})
{

    const iconStyle = (() => {
        const categoryMapping = {
          "Profile": "hubi",
          "Transaction": "cash-flow",
          "Goals": "rocket",
          "Balance": "research",
          "Default": "Blank",
          "Savings": "Savings"
        };
    
        var iconPath = categoryMapping[icon] || categoryMapping.Default;
    
        
          return {
            backgroundImage: `url(${require(`../assets/icons/icons_raw/${iconPath}.png`)})`,
          };
          })();

    return (
        <>
        <Link className="blankLink" to={`/${href}`}>
                  <div
        className="card"
        onClick={() => {}}
      >
        <div className="icon-container" style={iconStyle}>
        </div>
        <div className="text-container">
          <h2 className="title">{title}</h2>
        </div>
      </div>
      </Link>
        </>
    )
}

export default LinkCard;