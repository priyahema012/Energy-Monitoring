import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Button, Form, InputGroup, Card } from 'react-bootstrap';
import { FaSearch, FaDownload, FaUserCircle, FaBell } from 'react-icons/fa';
import './HistoryReport.css';
import { failure } from '../axios/Services';
import Filter from './Filter';
import { Pagination } from 'antd';

const HistoryReport: React.FC = () => {
  interface History {
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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState(0);
  const [filterVisible, setFilterVisible] = useState<Boolean>(false);
  const [pageSize,setPagesize] = useState(10);

  const handleFilterToggle = () => {
    setFilterVisible(!filterVisible);
  };

  const handlefailure = (currentPage = 1, size = 10 , search?: { fromDatetime: string; toDatetime: string }) => {
    const formData = new FormData();
    formData.append("token", token);
    if (search?.fromDatetime) {
      formData.append("fromDatetime", search?.fromDatetime);
    }
    if (search?.toDatetime) {
      formData.append("toDatetime", search?.toDatetime);
    }
    failure(formData, currentPage, size).then((res) => {
      setData(res.data.data?.items);
      setTotalItems(res.data.data?.total_count);
    });
  };

  useEffect(() => {
    if (token) {
      handlefailure(currentPage,pageSize);
    }
  }, [token, currentPage , pageSize]);

  const toggleApiDisplay = (id: number) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handlePageChange = (page: number , pageSize:number ) => {
    setCurrentPage(page);
    setPagesize(pageSize);
  };

  const renderApiCell = (id: number, api: string) => {
    const isExpanded = expandedRows.includes(id);
    const shortenedApi = api.length > 20 ? api.substring(0, 20) + '...' : api;

    return (
      <div>
        {isExpanded ? api : shortenedApi}
        {api.length > 20 && (
          <p className="text-end">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                toggleApiDisplay(id);
              }}
              className="text-primary"
            >
              {isExpanded ? 'Show Less' : 'Show More'}
            </a>
          </p>
        )}
      </div>
    );
  };

  return (
    <Container fluid className="vh-100">
      <Row className="p-3">
      <Row>
        <Col>   <h5 className="mb-3">History Report</h5></Col>
        <Col md={4} className="d-flex justify-content-end align-items-center">
          <Button variant="warning" className="mx-2">
            <FaDownload /> Download
          </Button>
          <Form className="d-flex align-items-center">
            <InputGroup>
            
              <Button onClick={handleFilterToggle}>   <FaSearch /></Button>
              <InputGroup.Text>
              
              </InputGroup.Text>
            </InputGroup>
          </Form>
          {/* <FaBell className="mx-3" />
          <FaUserCircle className="mx-2" size={30} /> */}
        </Col>
      </Row>
    

        {/* <Col md={8} className="d-flex align-items-center">
          <h4 className="text-dark">Reports</h4>
          <Form.Control type="text" placeholder="MAE136" className="mx-3 w-25" />
          <Form.Control type="text" placeholder="Elmeasure" className="w-25" />
        </Col> */}
        {/* <Col md={4} className="d-flex justify-content-end align-items-center">
          <Button variant="warning" className="mx-2">
            <FaDownload /> Download
          </Button>
          <Form className="d-flex align-items-center">
            <InputGroup>
            
              <Button onClick={handleFilterToggle}>   <FaSearch /></Button>
              <InputGroup.Text>
              
              </InputGroup.Text>
            </InputGroup>
          </Form>
          {/* <FaBell className="mx-3" />
          <FaUserCircle className="mx-2" size={30} /> */}
        {/* </Col>  */}
      </Row>

    
       
        

           <Card>
           {filterVisible && <Filter functioncall={handlefailure} />}
           <div className="mt-2 table-responsive mx-auto py-3">
            <Table striped bordered hover className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>API</th>
                  <th>API Response</th>
                  <th>Call Method</th>
                  <th>Params</th>
                  <th>Response Time</th>
                </tr>
              </thead>
              <tbody>
                {data?.length > 0 ? (
                  data?.map((items, index) => (
                    <tr key={index}>
                      <td>{items?.id}</td>
                      <td>{renderApiCell(items?.id, items?.api)}</td>
                      <td>{items?.api_response}</td>
                      <td>{items?.call_method}</td>
                      <td>{renderApiCell(items?.id, items?.params)}</td>
                      <td>{items?.response_time}</td>
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
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={totalItems}
            onChange={handlePageChange}
            
          />

           </Card>
        
        
         
       
    </Container>
  );
};

export default HistoryReport;
