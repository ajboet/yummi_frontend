import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import { axiosInstance } from "../../axiosInstance"

const History = (props) => {
  const [show, setShow] = useState(false)
  const [historical, setHistorical] = useState([])

  const getOrders = async () => {
    try {
      let response = await axiosInstance.get('order_record')
      response = response.data
      for (let j = 0; j < response.length; j++) {
        let items = response[j].items
        for (let i = 0; i < items.length; i++) {
          var nam = await getProducInfo(items[i].product_id)
          items[i]['product'] = ` (${items[i].quantity}) ${nam},`
        }
        response[j]['items'] = items
      }
      setHistorical(response)
    } catch (error) {
      // console.log('Lo que retorna el error de la consulta de la orden ->', error);
    }
  }

  function getDate(data) {
    return data.split(' ')[0]
  }

  const getProducInfo = async (id) => {
    try {
      let product = await axiosInstance.get('product/' + id)
      product = product.data.name
      return product
    } catch (error) {
    }
  }


  return (
    <>
      <NavDropdown.Item eventKey="historical" onClick={() => {
        setShow(true)
        getOrders()
      }}>
        Historical
      </NavDropdown.Item>
      <Modal
        show={show}
        animation={false}
        onHide={() => setShow(false)}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="font-weight-bold" id="contained-modal-title-vcenter">
            Order Historical
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table responsive>
            <thead>
              <tr style={{ color: 'white', fontWeight: 900, fontSize: 19, fontFamily: 'Cabin Sketch, cursive' }}>
                <th>Id</th>
                <th>State</th>
                <th>Date</th>
                <th>Products</th>
                <th>SubTotal</th>
                <th>Tax</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {historical.length === 0 || historical.length === undefined ?
                <tr style={{ color: 'white', fontWeight: 900, fontSize: 40, fontFamily: 'Cabin Sketch, cursive', textAlign: 'center', justifyContent: 'center' }}>
                  <td colSpan="7">"You don't have orders"</td>
                </tr>
                : historical.map((order, key) => {
                  return (
                    <tr key={key} style={{ color: 'white', fontWeight: 900, fontSize: 16, fontFamily: 'Cabin Sketch, cursive' }}>
                      <td>{order.id}</td>
                      <td>{order.status}</td>
                      <td>{getDate(order.created_at)}</td>
                      <td>{
                        order.items.map((prod, index) => (
                          <span key={index}>
                            {prod.product}
                          </span>
                        ))
                      }</td>
                      <td>
                        <i className={
                          `${props.currency === 'USD' ?
                            'fa fa-dollar-sign' :
                            'fa fa-euro-sign'}`
                        }
                          style={{ marginRight: 3, color: 'white' }}
                        >
                        </i>
                        {
                          props.currency === 'EUR' ? Number(order.subtotal).toFixed(2) : (Number(order.subtotal) * props.rateUSD).toFixed(2)
                        }
                      </td>
                      <td>{order.tax}</td>
                      <td>
                        <i className={
                          `${props.currency === 'USD' ?
                            'fa fa-dollar-sign' :
                            'fa fa-euro-sign'}`
                        }
                          style={{ marginRight: 3, color: 'white' }}
                        >
                        </i>
                        {
                          props.currency === 'EUR' ? Number(order.total).toFixed(2) : (Number(order.total) * props.rateUSD).toFixed(2)
                        }
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='outline-danger' onClick={() => setShow(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default History