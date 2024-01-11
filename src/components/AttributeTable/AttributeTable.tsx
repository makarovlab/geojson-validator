import Table from 'react-bootstrap/Table';

interface IAttribute {
    attrName: string,
    attrRequired: boolean,
    attrPresents: number,
    attrValidity: number,
}

interface IAttributeTable {
    className?: string,
    style?: React.CSSProperties,
    attribtesType?: string,
    attributes?: IAttribute[]
}

enum Quality {
    Good = "#2cbf32",
    Middle = "#ffa400",
    Bad = "#f67474",
    None = "#9baec1",
}

const AttributeTable = (props: IAttributeTable) => {

    const {
        className,
        style,
        attribtesType,
        attributes
    } = props;

    const calcPresentsColor = (percent: number) => {
        if (percent === 0) {
            return Quality.None;
        } else {
            return percent > 90 ? Quality.Good : (percent < 40 ? Quality.Bad : Quality.Middle);
        }
    }

    const calcValidityColor = (validityPercent: number, presentsPercent: number) => {
        if (presentsPercent == 0) {
            return Quality.None;
        } else {
            return validityPercent > 90 ? Quality.Good : (validityPercent < 40 ? Quality.Bad : Quality.Middle);
        }
    }

    const isAttrInDataFormat = (attributeName: string): boolean => {
        const attrsList = [
            "ref", "chain_name", "chain_id",
            "addr:full", "lat", "lon",
            "addr:housenumber", "addr:street",
            "addr:city", "addr:state", "addr:postcode",
            "addr:country", "phones", "email", "website",
            "store_url", "operatingHours", "@spider", "name",
        ]
        
        return attrsList.includes(attributeName);
    }

    return (
        <Table 
            bordered 
            size="sm"
            style={style ?? style} 
            className={className ?? className}
        >
            <thead>
                <tr>
                    <th>{attribtesType ? attribtesType : "Untitled Attributes"}</th>
                    <th>Is attribute presented</th>
                    <th>Is attribute valid</th>
                </tr>
            </thead>
            <tbody>
                {attributes?.map((item, index) => (
                    <tr key={`${item.attrName}-${index}`}>
                        <td>{
                            item.attrRequired
                                ? <strong>{item.attrName}*</strong>
                                : isAttrInDataFormat(item.attrName)
                                    ? item.attrName
                                    : <span style={{color: "red"}}>{item.attrName}</span> 
                        }</td>
                        <td style={{color: "#fff", backgroundColor: calcPresentsColor(item.attrPresents)}}>
                            {item.attrPresents}%
                        </td>
                        <td style={{color: "#fff", backgroundColor: calcValidityColor(item.attrValidity, item.attrPresents)}}>
                            {item.attrValidity}%
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

export default AttributeTable;