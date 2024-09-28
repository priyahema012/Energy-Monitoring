import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Card,
} from "react-bootstrap";
import { FaDownload, FaSearch } from "react-icons/fa";
import { history } from "../axios/Services";
import Filter from "../Dashboard/Filter";
import { Pagination } from "antd";
import styles from './Notification.module.css'; // Import your CSS module for custom styles

const Notification: React.FC = () => {
  interface History {
    device_id: number;
    device_name: string;
    date: string;
    on_time: string;
    off_time: string;
    max_value: number;
    id: number;
    api: string;
    api_response: string;
    call_method: string;
    params: string;
    response_time: number;
  }

  const [data, setData] = useState<History[]>([]);
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const token = localStorage.getItem("userdata") || "";
  const [filterVisible, setFilterVisible] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const[pageSize,setPagesize] = useState(10)

  // Toggle Filter visibility
  const handleFilterToggle = () => {
    setFilterVisible(!filterVisible); // Toggle filter visibility
  };

  // API call to fetch history data
  const handlehistory = (
    currentPage = 1,
    size = 10,
    search?: { fromDatetime: string; toDatetime: string }
  ) => {
    const formData = new FormData();
    formData.append("token", token);

    if (search?.fromDatetime) {
      formData.append("fromDatetime", search.fromDatetime);
    }
    if (search?.toDatetime) {
      formData.append("toDatetime", search.toDatetime);
    }

    history(formData, currentPage, size)
      .then((res) => {
        if (res?.data?.data?.items) {
          setData(res.data.data.items[0].data);
          setTotalItems(res.data.data.total_count);
        }
      })
      .catch((error) => {
        console.error("API call failed", error);
      });
  };

  const handlePageChange = (page: number,pageSize:number) => {
    setCurrentPage(page);
    setPagesize(pageSize);
  };

  useEffect(() => {
    if (token) {
      handlehistory(currentPage, pageSize);
    }
  }, [token, currentPage,pageSize]);

  return (
    <Container fluid className="vh-100">

      <Row>
      <Row>
          <Col>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>History Report</h5>
          </div>
          </Col>
         
          <Col >
         
          <Button className={`${styles.downloadButton} mr-2 float-end`}>
              <FaDownload /> Download
            </Button>

            <Button onClick={handleFilterToggle} className="mr-2 float-end">
              <FaSearch />
            </Button>
          </Col>
          </Row>

         

            <Card>
            <div className="d-flex justify-content-end align-items-center mb-3">
           

           {/* Filter Component */}
           {filterVisible && (
             <div className="flex-grow-1">
               <Filter functioncall={handlehistory} />
             </div>
           )}
         </div>



         <div className="">
            <Table
              striped
              bordered
              hover
              style={{ minWidth: "1000px", width: "100%" }} // Increased minimum width
            >
              <thead>
                <tr>
                  <th>Device ID</th>
                  <th>Device Name</th>
                  <th>Date</th>
                  <th>On Time</th>
                  <th>Off Time</th>
                  <th>Max Value</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((item, index) => (
                    <tr key={index}>
                      <td>{item.device_id}</td>
                      <td>{item.device_name}</td>
                      <td>{item.date}</td>
                      <td>{item.on_time}</td>
                      <td>{item.off_time}</td>
                      <td>{item.max_value}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6}>No data available</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>


          <div className="d-flex justify-content-center mt-2">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={totalItems}
              onChange={handlePageChange}
            />
          </div>
       


            </Card>


        

        
       
        
         
      </Row>
    </Container>
  );
};

export default Notification;




















// import React, { useState, useEffect } from "react";
// import {
//   Container,
//   Row,
//   Col,
//   Table,
//   Button,
// } from "react-bootstrap";
// import { FaDownload, FaSearch } from "react-icons/fa";
// import { history } from "../axios/Services";
// import Filter from "../Dashboard/Filter";
// import { Pagination } from "antd";
// import styles from './Notification.module.css'; // Import the CSS module

// const Notification: React.FC = () => {
//   interface History {
//     device_id: number;
//     device_name: string;
//     date: string;
//     on_time: string;
//     off_time: string;
//     max_value: number;
//     id: number;
//     api: string;
//     api_response: string;
//     call_method: string;
//     params: string;
//     response_time: number;
//   }

//   const [data, setData] = useState<History[]>([]);
//   const [expandedRows, setExpandedRows] = useState<number[]>([]);
//   const token = localStorage.getItem("userdata") || "";
//   const [filterVisible, setFilterVisible] = useState<Boolean>(false);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [totalItems, setTotalItems] = useState<number>(0);

//   // Toggle Filter visibility
//   const handleFilterToggle = () => {
//     setFilterVisible(!filterVisible); // Toggle filter visibility
//   };

//   // API call to fetch history data
//   const handlehistory = (
//     currentPage = 1,
//     size = 10,
//     search?: { fromDatetime: string; toDatetime: string }
//   ) => {
//     const formData = new FormData();
//     formData.append("token", token);

//     if (search?.fromDatetime) {
//       formData.append("fromDatetime", search?.fromDatetime);
//     }
//     if (search?.toDatetime) {
//       formData.append("toDatetime", search?.toDatetime);
//     }

//     history(formData, currentPage, size)
//       .then((res) => {
//         if (res?.data?.data?.items) {
//           setData(res.data.data.items[0].data);
//           setTotalItems(res.data.data.total_count);
//         }
//       })
//       .catch((error) => {
//         console.error("API call failed", error);
//       });
//   };

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//   };

//   useEffect(() => {
//     if (token) {
//       handlehistory(currentPage, 10);
//     }
//   }, [token, currentPage]);

//   return (
//     <Container fluid className="vh-100">
//       <Row>
//         <Col md={12} className="p-3">
//           <div className="d-flex justify-content-between align-items-center mb-3">
//             <h5>History Report</h5>
//           </div>

//           {/* Combined Download and Search Section */}
//           <div className="d-flex justify-content-between align-items-center mb-3">
//             <Button className={`${styles.downloadButton} ml-auto`}>
//               <FaDownload /> Download
//             </Button>

//             <Button onClick={handleFilterToggle} className="ml-3">
//               <FaSearch />
//             </Button>

//             {/* Filter Component */}
//             {filterVisible && (
//               <div className="flex-grow-1 ml-3">
//                 <Filter functioncall={handlehistory} />
//               </div>
//             )}
//           </div>

//           {/* Table */}
//           <div className="">
//             <Table
//               striped
//               bordered
//               hover
//               style={{ minWidth: "1000px", width: "100%" }} // Increased minimum width
//             >
//               <thead>
//                 <tr>
//                   <th>Device ID</th>
//                   <th>Device Name</th>
//                   <th>Date</th>
//                   <th>On Time</th>
//                   <th>Off Time</th>
//                   <th>Max Value</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {data.length > 0 ? (
//                   data.map((item, index) => (
//                     <tr key={index}>
//                       <td>{item.device_id}</td>
//                       <td>{item.device_name}</td>
//                       <td>{item.date}</td>
//                       <td>{item.on_time}</td>
//                       <td>{item.off_time}</td>
//                       <td>{item.max_value}</td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan={6}>No data available</td>
//                   </tr>
//                 )}
//               </tbody>
//             </Table>
//           </div>

//           {/* Adjusted Pagination */}
//           <div className="d-flex justify-content-center mt-2">
//             <Pagination
//               current={currentPage}
//               pageSize={10}
//               total={totalItems}
//               onChange={handlePageChange}
//             />
//           </div>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Notification;
