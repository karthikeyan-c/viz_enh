'use strict';

import _ from 'lodash';
import React from 'react';
import { Table, Column, SortDirection } from 'react-virtualized';
import PropTypes from 'prop-types';
import 'react-virtualized/styles.css';

const recRenderer = function (data) {
  return (<span className={data.rowData.className} title={data.rowData.name}>{data.rowData.rec}</span>);
};

const totRenderer = function (data) {
  return (<span className={data.rowData.className} title={data.rowData.tot}>{data.rowData.tot}</span>);
};

const percRenderer = function (data) {
  return (<span className={data.rowData.className} title={data.rowData.perc}>{data.rowData.perc}</span>);
};

class Notices extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      notices: props.notices
    };
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      notices: nextProps.notices
    });
  }

  render () {
    const headerHeight = 30;
    let estimatedRowHeight = 25;
    const maxTableHeight = 300;
    const nodeRows = _.map(this.state.notices, (notice) => {
     let noticeTemp = notice.title.split("|");
     let rec = noticeTemp[0]; 
     let tot = noticeTemp[1]; 
     let perc = noticeTemp[2]; 
     let colorName = 'normal';
     const className = colorName ? `color-${colorName}` : '';
      return {
        rec: rec,
        tot: tot,
        perc: perc,
        className: className
      };
    });

    //return (
    //  <div className="details-panel-description subsection"><span style={{ fontWeight: 600 }}></span>
    //    {
    //      this.state.notices.length > 0 ? this.state.notices.map((notice) => {
    //        let noticeTitle = notice.title;
    //        let noticeTemp = (notice.title).split("|");
    //        let rec = noticeTemp[0]; 
    //        let tot = noticeTemp[1]; 
    //        let perc = noticeTemp[2]; 

    //        if (notice.link) {
    //          noticeTitle = <span>{notice.title} <a href={notice.link} target="_blank"><span className="glyphicon glyphicon-new-window"></span></a></span>;
    //        }

    	    const tableHeight = Math.min(maxTableHeight, (estimatedRowHeight * nodeRows.length) + headerHeight);
            //return <div key={notice.title}>{noticeTitle}</div>;
    return ( nodeRows.length > 0
        ? <div className="node-list">
          <Table
            ref="flexTable"
            width={300}
            height={tableHeight}
            headerHeight={headerHeight}
            rowHeight={25}
            rowCount={nodeRows.length}
            rowGetter={({ index }) => nodeRows[index]}
          >
            <Column label="Histogram" dataKey="name" cellRenderer={recRenderer} width={100} />
            <Column label="Success Req" dataKey="errorRate" cellRenderer={totRenderer} width={82}/>
            <Column label="Distribution" dataKey="errorRate" cellRenderer={percRenderer} width={82}/>
          </Table>
        </div>
        : <span>None.</span>
    );
    //      }) : (<div>None</div>)
    //    }
    //  </div>
    //);
  }
}

Notices.propTypes = {
  notices: PropTypes.array.isRequired
};

export default Notices;
