import React, {useState, Fragment} from 'react';
import { FaEdit } from 'react-icons/fa';
import ReactFlow, {addEdge, Background, Controls, MiniMap} from 'react-flow-renderer';

const initialElements = [
    {id: '1', type: 'input', data:{label: 'Brain Flow'}, position: {x:0,y:0}}
]
const onLoad = (reactFlowInstance) =>  {
    reactFlowInstance.fitView();
}

const MindNode = () => {
    const [elements, setElements] = useState(initialElements);
    const [showEdit, setShowEdit] = useState(false);
    const [name, setName] = useState("")
    
    const addNode = () => {
        setElements(e => e.concat({
            id: (e.length+1).toString(),
            data: {label: `${name}`},
            position: {x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight}
        }));
    };

    const onConnect = (params) => setElements(e => addEdge(params,e));
    
    return(
        <Fragment>
            <div style={{'display': 'flex'}}>
                <input 
                type="text"
                style={{'borderRadius': '4px'}}
                onChange={(e) => setName(e.target.value)}
                className="add-project__name small-input"
                placeholder='Node Title'/>
                <button 
                type="button"
                className="btn-add btn-action"
                style={{'marginTop': '1.5px'}}
                onClick={addNode}
                >Add Node</button>
                {showEdit && <FaEdit />}
            </div>
            <ReactFlow
            elements={elements}
            onLoad={onLoad}
            style={{width:'100%',height: '90vh'}}
            onConnect = {onConnect}
            connectionLineStyle={{stroke: "#ddd", strokeWidth: 2}}
            connectionLineType = "bezier"
            snapToGrid = {true}
            snapGrid={[16,16]}
            onClick={() => setShowEdit(!showEdit)}
            >
                <Background
                color="#888"
                gap={16}
                />
                <MiniMap 
                nodeColor={n=>{
                    if(n.type === 'input') return 'blue';
                    
                    return '#FFCC00'
                }} />
                <Controls />
                </ReactFlow>
        </Fragment>
    )
}

export default MindNode;