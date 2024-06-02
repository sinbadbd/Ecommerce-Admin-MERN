import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import Header from '../Header'


import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


import { NavLink } from 'react-router-dom'

const Layout = (props) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const token = window.localStorage.getItem('token');

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };


    return (
        <>

            <Header />

            {
                props.sidebar ?

                    <div class="flex h-screen overflow-hidden">
                        <aside
                            className="absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 -translate-x-full"
                        >
                            <button
                                className="p-2 text-white"
                                onClick={() => setSidebarOpen(false)}
                            >
                                Close
                            </button>

                            <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
                                <ul className="nav flex-column">
                                    <li className="nav-item ">
                                        <NavLink className="active" to={`/`}>Home</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to={`/category`}>Category</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to={`/products`}>Prouduct</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to={`/orders`}>Orders</NavLink>
                                    </li>
                                </ul>
                                <div>

                                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel2bh-content"
                                            id="panel2bh-header"
                                        >
                                            {/* <Typography sx={{ width: '33%', flexShrink: 0 }}>Users</Typography> */}
                                            <Typography sx={{ color: 'text.secondary' }}>
                                                Prouduct
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                                <div className='flex flex-col'>
                                                <NavLink to={`/products`}> Prouduct List</NavLink>
                                                <NavLink to={`/add-product`}>Add Prouduct</NavLink>
                                               </div>
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                </div>
                            </div>
                        </aside>


                        <div class="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">

                            <main>

                                <div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
                                    <Header />
                                    {/* mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 */}
                                    <div className='flex max-w-screen-2xl'>
                                        <div className="flex">

                                            {props.children}
                                        </div>
                                    </div>
                                </div>
                            </main>

                        </div>
                    </div>

                    :
                    props.children
            }

        </>
    )
}

export default Layout
