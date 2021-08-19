
import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import {
  Avatar_01, Avatar_02, Avatar_03, Avatar_04, Avatar_05, Avatar_11, Avatar_12, Avatar_09,
  Avatar_10, Avatar_08, Avatar_13, Avatar_16
} from "../../../Entryfile/imagepath"
import { Formik, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { allEmployeesAction } from './Reducers/employeeReducer';
import { connect } from 'react-redux';

const validationSchema = Yup.object().shape({
  first_name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  user_name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Password is required'),
  cPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
  joining_date: Yup.date().required('Required')
});
class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      module_loading: true,
    };
  }
  addEmploye = async (values) => {
    delete values['cPassword']
    console.log("values=====>", values);
    let res = await axios.post("http://localhost:3000/employee/create/v1", values)
    console.log("res==>", res);
  }
  getCompanyName = async () => {
    try {
      const res = await axios.get("http://localhost:3000/company/master/v1")
      this.props.getCompany(res.data.data)
    } catch (error) {
      console.log(error);
    }
  }
  getModulePermission = async () => {
    try {
      const res = await axios.get("http://localhost:3000/module/master/v1")
      res.data.data.forEach((item) => {
        item['name'] = item.module_name;
        item['module_id'] = item.id;
        item['is_active'] = 1;
        item['created_at'] = "2021-08-14T10:52:34.000Z";
        item['created_by'] = 1;
        item['updated_at'] = "2021-08-14T10:52:34.000Z";
        item['updated_by'] = 1;
        item['read'] = false;
        item['update'] = false;
        item['create'] = false;
        item['delete'] = false;
        item['import'] = false;
        item['export'] = false;
      })
      this.props.getModulePermission(res.data.data)
      this.setState({
        module_loading: false,
      })
    } catch (error) {
      console.log(error);
    }
  }
  componentDidMount() {
    this.getCompanyName();
    this.getModulePermission()
  }
  companyOnchange = async (e) => {
    const id = e.target.value
    try {
      let res = await axios.get(`http://localhost:3000/department/master/${id}/v1`)
      this.props.getDepartment(res.data.data)
    } catch (error) {
      console.log(error);
    }
  }
  departmentOnchange = async (e) => {
    const id = e.target.value
    try {
      const res = await axios.get(`http://localhost:3000/designation/master/${id}/v1`)
      this.props.getDesignation(res.data.data)
    } catch (error) {
      console.log(error);
    }
  }

  moduleHandler = async (e, index) => {
    console.log(e.target.name, index);
    this.state.module_permission[index][e.target.name] = e.target.checked
    this.setState({
      ...this.state,
      module_permission: this.state.module_permission
    })
  }
  render() {
    return (
      <div className="page-wrapper">
        <Helmet>
          <title>Employee - HRMS Admin Template</title>
          <meta name="description" content="Login page" />
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">Employee</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item"><a href="/blue/app/main/dashboard">Dashboard</a></li>
                  <li className="breadcrumb-item active">Employee</li>
                </ul>
              </div>
              <div className="col-auto float-right ml-auto">
                <a href="#" className="btn add-btn" data-toggle="modal" data-target="#add_employee"><i className="fa fa-plus" /> Add Employee</a>
                <div className="view-icons">
                  <a href="/blue/app/employee/allemployees" className="grid-view btn btn-link active"><i className="fa fa-th" /></a>
                  <a href="/blue/app/employee/employees-list" className="list-view btn btn-link"><i className="fa fa-bars" /></a>
                </div>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          {/* Search Filter */}
          <div className="row filter-row">
            <div className="col-sm-6 col-md-3">
              <div className="form-group form-focus">
                <input type="text" className="form-control floating" />
                <label className="focus-label">Employee ID</label>
              </div>
            </div>
            <div className="col-sm-6 col-md-3">
              <div className="form-group form-focus">
                <input type="text" className="form-control floating" />
                <label className="focus-label">Employee Name</label>
              </div>
            </div>
            <div className="col-sm-6 col-md-3">
              <div className="form-group form-focus select-focus">
                <select className="select floating">
                  <option>Select Designation</option>
                  <option>Web Developer</option>
                  <option>Web Designer</option>
                  <option>Android Developer</option>
                  <option>Ios Developer</option>
                </select>
                <label className="focus-label">Designation</label>
              </div>
            </div>
            <div className="col-sm-6 col-md-3">
              <a href="#" className="btn btn-success btn-block"> Search </a>
            </div>
          </div>
          {/* Search Filter */}
          <div className="row staff-grid-row">
            <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3">
              <div className="profile-widget">
                <div className="profile-img">
                  <a href="/blue/app/profile/employee-profile" className="avatar"><img src={Avatar_02} alt="" /></a>
                </div>
                <div className="dropdown profile-action">
                  <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                  <div className="dropdown-menu dropdown-menu-right">
                    <a className="dropdown-item" href="#" data-toggle="modal" data-target="#edit_employee"><i className="fa fa-pencil m-r-5" /> Edit</a>
                    <a className="dropdown-item" href="#" data-toggle="modal" data-target="#delete_employee"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                  </div>
                </div>
                <h4 className="user-name m-t-10 mb-0 text-ellipsis"><a href="/blue/app/profile/employee-profile">John Doe</a></h4>
                <div className="small text-muted">Web Designer</div>
              </div>
            </div>
            <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3">
              <div className="profile-widget">
                <div className="profile-img">
                  <a href="/blue/app/profile/employee-profile" className="avatar"><img src={Avatar_09} alt="" /></a>
                </div>
                <div className="dropdown profile-action">
                  <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                  <div className="dropdown-menu dropdown-menu-right">
                    <a className="dropdown-item" href="#" data-toggle="modal" data-target="#edit_employee"><i className="fa fa-pencil m-r-5" /> Edit</a>
                    <a className="dropdown-item" href="#" data-toggle="modal" data-target="#delete_employee"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                  </div>
                </div>
                <h4 className="user-name m-t-10 mb-0 text-ellipsis"><a href="/blue/app/profile/employee-profile">Richard Miles</a></h4>
                <div className="small text-muted">Web Developer</div>
              </div>
            </div>
            <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3">
              <div className="profile-widget">
                <div className="profile-img">
                  <a href="/blue/app/profile/employee-profile" className="avatar"><img src={Avatar_10} alt="" /></a>
                </div>
                <div className="dropdown profile-action">
                  <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                  <div className="dropdown-menu dropdown-menu-right">
                    <a className="dropdown-item" href="#" data-toggle="modal" data-target="#edit_employee"><i className="fa fa-pencil m-r-5" /> Edit</a>
                    <a className="dropdown-item" href="#" data-toggle="modal" data-target="#delete_employee"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                  </div>
                </div>
                <h4 className="user-name m-t-10 mb-0 text-ellipsis"><a href="/blue/app/profile/employee-profile">John Smith</a></h4>
                <div className="small text-muted">Android Developer</div>
              </div>
            </div>
            <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3">
              <div className="profile-widget">
                <div className="profile-img">
                  <a href="/blue/app/profile/employee-profile" className="avatar"><img src={Avatar_05} alt="" /></a>
                </div>
                <div className="dropdown profile-action">
                  <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                  <div className="dropdown-menu dropdown-menu-right">
                    <a className="dropdown-item" href="#" data-toggle="modal" data-target="#edit_employee"><i className="fa fa-pencil m-r-5" /> Edit</a>
                    <a className="dropdown-item" href="#" data-toggle="modal" data-target="#delete_employee"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                  </div>
                </div>
                <h4 className="user-name m-t-10 mb-0 text-ellipsis"><a href="/blue/app/profile/employee-profile">Mike Litorus</a></h4>
                <div className="small text-muted">IOS Developer</div>
              </div>
            </div>
            <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3">
              <div className="profile-widget">
                <div className="profile-img">
                  <a href="/blue/app/profile/employee-profile" className="avatar"><img src={Avatar_11} alt="" /></a>
                </div>
                <div className="dropdown profile-action">
                  <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                  <div className="dropdown-menu dropdown-menu-right">
                    <a className="dropdown-item" href="#" data-toggle="modal" data-target="#edit_employee"><i className="fa fa-pencil m-r-5" /> Edit</a>
                    <a className="dropdown-item" href="#" data-toggle="modal" data-target="#delete_employee"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                  </div>
                </div>
                <h4 className="user-name m-t-10 mb-0 text-ellipsis"><a href="/blue/app/profile/employee-profile">Wilmer Deluna</a></h4>
                <div className="small text-muted">Team Leader</div>
              </div>
            </div>
            <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3">
              <div className="profile-widget">
                <div className="profile-img">
                  <a href="/blue/app/profile/employee-profile" className="avatar"><img src={Avatar_12} alt="" /></a>
                </div>
                <div className="dropdown profile-action">
                  <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                  <div className="dropdown-menu dropdown-menu-right">
                    <a className="dropdown-item" href="#" data-toggle="modal" data-target="#edit_employee"><i className="fa fa-pencil m-r-5" /> Edit</a>
                    <a className="dropdown-item" href="#" data-toggle="modal" data-target="#delete_employee"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                  </div>
                </div>
                <h4 className="user-name m-t-10 mb-0 text-ellipsis"><a href="/blue/app/profile/employee-profile">Jeffrey Warden</a></h4>
                <div className="small text-muted">Web Developer</div>
              </div>
            </div>
            <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3">
              <div className="profile-widget">
                <div className="profile-img">
                  <a href="/blue/app/profile/employee-profile" className="avatar"><img src={Avatar_13} alt="" /></a>
                </div>
                <div className="dropdown profile-action">
                  <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                  <div className="dropdown-menu dropdown-menu-right">
                    <a className="dropdown-item" href="#" data-toggle="modal" data-target="#edit_employee"><i className="fa fa-pencil m-r-5" /> Edit</a>
                    <a className="dropdown-item" href="#" data-toggle="modal" data-target="#delete_employee"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                  </div>
                </div>
                <h4 className="user-name m-t-10 mb-0 text-ellipsis"><a href="/blue/app/profile/employee-profile">Bernardo Galaviz</a></h4>
                <div className="small text-muted">Web Developer</div>
              </div>
            </div>
            <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3">
              <div className="profile-widget">
                <div className="profile-img">
                  <a href="/blue/app/profile/employee-profile" className="avatar"><img src={Avatar_01} alt="" /></a>
                </div>
                <div className="dropdown profile-action">
                  <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                  <div className="dropdown-menu dropdown-menu-right">
                    <a className="dropdown-item" href="#" data-toggle="modal" data-target="#edit_employee"><i className="fa fa-pencil m-r-5" /> Edit</a>
                    <a className="dropdown-item" href="#" data-toggle="modal" data-target="#delete_employee"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                  </div>
                </div>
                <h4 className="user-name m-t-10 mb-0 text-ellipsis"><a href="/blue/app/profile/employee-profile">Lesley Grauer</a></h4>
                <div className="small text-muted">Team Leader</div>
              </div>
            </div>
            <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3">
              <div className="profile-widget">
                <div className="profile-img">
                  <a href="/blue/app/profile/employee-profile" className="avatar"><img src={Avatar_16} alt="" /></a>
                </div>
                <div className="dropdown profile-action">
                  <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                  <div className="dropdown-menu dropdown-menu-right">
                    <a className="dropdown-item" href="#" data-toggle="modal" data-target="#edit_employee"><i className="fa fa-pencil m-r-5" /> Edit</a>
                    <a className="dropdown-item" href="#" data-toggle="modal" data-target="#delete_employee"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                  </div>
                </div>
                <h4 className="user-name m-t-10 mb-0 text-ellipsis"><a href="/blue/app/profile/employee-profile">Jeffery Lalor</a></h4>
                <div className="small text-muted">Team Leader</div>
              </div>
            </div>
            <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3">
              <div className="profile-widget">
                <div className="profile-img">
                  <a href="/blue/app/profile/employee-profile" className="avatar"><img src={Avatar_04} alt="" /></a>
                </div>
                <div className="dropdown profile-action">
                  <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                  <div className="dropdown-menu dropdown-menu-right">
                    <a className="dropdown-item" href="#" data-toggle="modal" data-target="#edit_employee"><i className="fa fa-pencil m-r-5" /> Edit</a>
                    <a className="dropdown-item" href="#" data-toggle="modal" data-target="#delete_employee"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                  </div>
                </div>
                <h4 className="user-name m-t-10 mb-0 text-ellipsis"><a href="/blue/app/profile/employee-profile">Loren Gatlin</a></h4>
                <div className="small text-muted">Android Developer</div>
              </div>
            </div>
            <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3">
              <div className="profile-widget">
                <div className="profile-img">
                  <a href="/blue/app/profile/employee-profile" className="avatar"><img src={Avatar_03} alt="" /></a>
                </div>
                <div className="dropdown profile-action">
                  <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                  <div className="dropdown-menu dropdown-menu-right">
                    <a className="dropdown-item" href="#" data-toggle="modal" data-target="#edit_employee"><i className="fa fa-pencil m-r-5" /> Edit</a>
                    <a className="dropdown-item" href="#" data-toggle="modal" data-target="#delete_employee"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                  </div>
                </div>
                <h4 className="user-name m-t-10 mb-0 text-ellipsis"><a href="/blue/app/profile/employee-profile">Tarah Shropshire</a></h4>
                <div className="small text-muted">Android Developer</div>
              </div>
            </div>
            <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3">
              <div className="profile-widget">
                <div className="profile-img">
                  <a href="/blue/app/profile/employee-profile" className="avatar"><img src={Avatar_08} alt="" /></a>
                </div>
                <div className="dropdown profile-action">
                  <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                  <div className="dropdown-menu dropdown-menu-right">
                    <a className="dropdown-item" href="#" data-toggle="modal" data-target="#edit_employee"><i className="fa fa-pencil m-r-5" /> Edit</a>
                    <a className="dropdown-item" href="#" data-toggle="modal" data-target="#delete_employee"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                  </div>
                </div>
                <h4 className="user-name m-t-10 mb-0 text-ellipsis"><a href="/blue/app/profile/employee-profile">Catherine Manseau</a></h4>
                <div className="small text-muted">Android Developer</div>
              </div>
            </div>
          </div>
        </div>
        {/* /Page Content */}
        {/* Add Employee Modal */}
        <div id="add_employee" className="modal custom-modal fade" role="dialog">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Employee</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                {!this.state.module_loading ? <Formik
                  initialValues={{
                    employee_id: Math.random().toString(),
                    first_name: "",
                    last_name: "",
                    user_name: "",
                    email: "",
                    password: "",
                    cPassword: "",
                    joining_date: "",
                    phone: "",
                    company_id: 0,
                    department_id: 0,
                    designation_id: 0,
                    is_active: 1,
                    roll_id: 1,
                    created_at: "2021-08-14T10:30:34.000Z",
                    created_by: 1,
                    updated_at: "2021-08-14T10:30:34.000Z",
                    updated_by: 1,
                    module_permission: this.props.module_permission,
                  }}
                  enableReinitialize={false}
                  validationSchema={validationSchema}
                  onSubmit={(values, actions) => {
                      this.addEmploye(values);
                      actions.resetForm();
                  }}
                >
                  {({ errors, values, touched, handleChange }) => (
                    <Form>
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="col-form-label">First Name <span className="text-danger">*</span></label>
                            <input className="form-control" type="text" value={values.first_name} onChange={handleChange} name="first_name" />
                            {errors.first_name && touched.first_name ? (<span className="text-danger">{errors.first_name}</span>) : null}
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="col-form-label">Last Name</label>
                            <input className="form-control" type="text" value={values.last_name} name="last_name" onChange={handleChange} />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="col-form-label">Username <span className="text-danger" >*</span></label>
                            <input className="form-control" type="text" value={values.user_name} name="user_name" onChange={handleChange} />
                            {errors.user_name && touched.user_name ? (<span className="text-danger">{errors.user_name}</span>) : null}
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="col-form-label">Email <span className="text-danger" >*</span></label>
                            <input className="form-control" type="email" value={values.email} name="email" onChange={handleChange} />
                            {errors.email && touched.email ? (<span className="text-danger">{errors.email}</span>) : null}
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="col-form-label" >Password</label>
                            <input className="form-control" type="password" value={values.password} name="password" onChange={handleChange} />
                            {errors.password && touched.password ? (<span className="text-danger">{errors.password}</span>) : null}
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="col-form-label" >Confirm Password</label>
                            <input className="form-control" type="password" value={values.cPassword} name="cPassword" onChange={handleChange} />
                            {errors.cPassword && touched.cPassword ? (<span className="text-danger">{errors.cPassword}</span>) : null}
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="col-form-label">Employee ID <span className="text-danger">*</span></label>
                            <input type="text" className="form-control" value={values.employee_id} name="employee_id" onChange={handleChange} />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="col-form-label">Joining Date <span className="text-danger">*</span></label>
                            <input className="form-control" type="date" value={values.joining_date} name="joining_date" onChange={handleChange} />
                            {errors.joining_date && touched.joining_date ? (<span className="text-danger">{errors.joining_date}</span>) : null}
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="col-form-label">Phone </label>
                            <input className="form-control" type="text" value={values.phone} name="phone" onChange={handleChange} />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="col-form-label">Company</label>
                            <select className="form-control" name="company_id" onChange={(e) => { handleChange(e); this.companyOnchange(e) }}>
                              <option>---Select Company---</option>
                              {this.props.companyList.map((item) => {
                                return (
                                  <option value={item.id}>{item.company_name}</option>
                                )
                              })}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Department <span className="text-danger">*</span></label>
                            <select className="form-control" name="department_id" onChange={(e) => { handleChange(e); this.departmentOnchange(e) }}>
                              <option>---Select Department---</option>
                              {this.props.departmentList.map((item) => {
                                return (
                                  <option value={item.id}>{item.department_name}</option>
                                )
                              })}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Designation <span className="text-danger">*</span></label>
                            <select className="form-control" name="designation_id" onChange={handleChange}>
                              <option>---Select Designation---</option>
                              {this.props.designationList.map((item) => {
                                return (
                                  <option value={item.id}>{item.designation_name}</option>
                                )
                              })}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="table-responsive m-t-15">
                        <table className="table table-striped custom-table">
                          <thead>
                            <tr>
                              <th>Module Permission</th>
                              <th>Type</th>
                              <th className="text-center">Read</th>
                              <th className="text-center">Write</th>
                              <th className="text-center">Create</th>
                              <th className="text-center">Delete</th>
                              <th className="text-center">Import</th>
                              <th className="text-center">Export</th>
                            </tr>
                          </thead>
                          <FieldArray
                            name="module_permission"
                            render={arrayHelpers => (
                              <>
                                <tbody>
                                  {values.module_permission.map((item, index) => (
                                    <tr key={index}>
                                      <td>{item.name}</td>
                                      <td>{item.type}</td>
                                      <td className="text-center">
                                        <input type="checkbox" name={`module_permission.${index}.read`} onChange={handleChange} />
                                      </td>
                                      <td className="text-center">
                                        <input type="checkbox" name={`module_permission.${index}.update`} onChange={handleChange} />
                                      </td>
                                      <td className="text-center">
                                        <input type="checkbox" name={`module_permission.${index}.create`} onChange={handleChange} />
                                      </td>
                                      <td className="text-center">
                                        <input type="checkbox" name={`module_permission.${index}.delete`} onChange={handleChange} />
                                      </td>
                                      <td className="text-center">
                                        <input type="checkbox" name={`module_permission.${index}.import`} onChange={handleChange} />
                                      </td>
                                      <td className="text-center">
                                        <input type="checkbox" name={`module_permission.${index}.export`} onChange={handleChange} />
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </>
                            )}
                          />
                        </table>
                      </div>
                      <div className="submit-section">
                        <button className="btn btn-primary submit-btn" type="submit">Submit</button>
                      </div>
                    </Form>
                  )}
                </Formik> : null}

              </div>
            </div>
          </div>
        </div>
        {/* /Add Employee Modal */}
        {/* Edit Employee Modal */}
        <div id="edit_employee" className="modal custom-modal fade" role="dialog">
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Employee</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="col-form-label">First Name <span className="text-danger">*</span></label>
                        <input className="form-control" defaultValue="John" type="text" />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="col-form-label">Last Name</label>
                        <input className="form-control" defaultValue="Doe" type="text" />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="col-form-label">Username <span className="text-danger">*</span></label>
                        <input className="form-control" defaultValue="johndoe" type="text" />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="col-form-label">Email <span className="text-danger">*</span></label>
                        <input className="form-control" defaultValue="johndoe@example.com" type="email" />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="col-form-label">Password</label>
                        <input className="form-control" defaultValue="johndoe" type="password" />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="col-form-label">Confirm Password</label>
                        <input className="form-control" defaultValue="johndoe" type="password" />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="col-form-label">Employee ID <span className="text-danger">*</span></label>
                        <input type="text" defaultValue="FT-0001" readOnly className="form-control floating" />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="col-form-label">Joining Date <span className="text-danger">*</span></label>
                        <div className="cal-icon"><input className="form-control datetimepicker" type="text" /></div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="col-form-label">Phone </label>
                        <input className="form-control" defaultValue={9876543210} type="text" />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="col-form-label">Company</label>
                        <select className="select">
                          <option>Global Technologies</option>
                          <option>Delta Infotech</option>
                          <option>International Software Inc</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Department <span className="text-danger">*</span></label>
                        <select className="select">
                          <option>Select Department</option>
                          <option>Web Development</option>
                          <option>IT Management</option>
                          <option>Marketing</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Designation <span className="text-danger">*</span></label>
                        <select className="select">
                          <option>Select Designation</option>
                          <option>Web Designer</option>
                          <option>Web Developer</option>
                          <option>Android Developer</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="table-responsive m-t-15">
                    <table className="table table-striped custom-table">
                      <thead>
                        <tr>
                          <th>Module Permission</th>
                          <th className="text-center">Read</th>
                          <th className="text-center">Write</th>
                          <th className="text-center">Create</th>
                          <th className="text-center">Delete</th>
                          <th className="text-center">Import</th>
                          <th className="text-center">Export</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Holidays</td>
                          <td className="text-center">
                            <input defaultChecked type="checkbox" />
                          </td>
                          <td className="text-center">
                            <input type="checkbox" />
                          </td>
                          <td className="text-center">
                            <input type="checkbox" />
                          </td>
                          <td className="text-center">
                            <input type="checkbox" />
                          </td>
                          <td className="text-center">
                            <input type="checkbox" />
                          </td>
                          <td className="text-center">
                            <input type="checkbox" />
                          </td>
                        </tr>
                        <tr>
                          <td>Leaves</td>
                          <td className="text-center">
                            <input defaultChecked type="checkbox" />
                          </td>
                          <td className="text-center">
                            <input defaultChecked type="checkbox" />
                          </td>
                          <td className="text-center">
                            <input defaultChecked type="checkbox" />
                          </td>
                          <td className="text-center">
                            <input type="checkbox" />
                          </td>
                          <td className="text-center">
                            <input type="checkbox" />
                          </td>
                          <td className="text-center">
                            <input type="checkbox" />
                          </td>
                        </tr>
                        <tr>
                          <td>Clients</td>
                          <td className="text-center">
                            <input defaultChecked type="checkbox" />
                          </td>
                          <td className="text-center">
                            <input defaultChecked type="checkbox" />
                          </td>
                          <td className="text-center">
                            <input defaultChecked type="checkbox" />
                          </td>
                          <td className="text-center">
                            <input type="checkbox" />
                          </td>
                          <td className="text-center">
                            <input type="checkbox" />
                          </td>
                          <td className="text-center">
                            <input type="checkbox" />
                          </td>
                        </tr>
                        <tr>
                          <td>Projects</td>
                          <td className="text-center">
                            <input defaultChecked type="checkbox" />
                          </td>
                          <td className="text-center">
                            <input type="checkbox" />
                          </td>
                          <td className="text-center">
                            <input type="checkbox" />
                          </td>
                          <td className="text-center">
                            <input type="checkbox" />
                          </td>
                          <td className="text-center">
                            <input type="checkbox" />
                          </td>
                          <td className="text-center">
                            <input type="checkbox" />
                          </td>
                        </tr>
                        <tr>
                          <td>Tasks</td>
                          <td className="text-center">
                            <input defaultChecked type="checkbox" />
                          </td>
                          <td className="text-center">
                            <input defaultChecked type="checkbox" />
                          </td>
                          <td className="text-center">
                            <input defaultChecked type="checkbox" />
                          </td>
                          <td className="text-center">
                            <input defaultChecked type="checkbox" />
                          </td>
                          <td className="text-center">
                            <input type="checkbox" />
                          </td>
                          <td className="text-center">
                            <input type="checkbox" />
                          </td>
                        </tr>
                        <tr>
                          <td>Chats</td>
                          <td className="text-center">
                            <input defaultChecked type="checkbox" />
                          </td>
                          <td className="text-center">
                            <input defaultChecked type="checkbox" />
                          </td>
                          <td className="text-center">
                            <input defaultChecked type="checkbox" />
                          </td>
                          <td className="text-center">
                            <input defaultChecked type="checkbox" />
                          </td>
                          <td className="text-center">
                            <input type="checkbox" />
                          </td>
                          <td className="text-center">
                            <input type="checkbox" />
                          </td>
                        </tr>
                        <tr>
                          <td>Assets</td>
                          <td className="text-center">
                            <input defaultChecked type="checkbox" />
                          </td>
                          <td className="text-center">
                            <input defaultChecked type="checkbox" />
                          </td>
                          <td className="text-center">
                            <input defaultChecked type="checkbox" />
                          </td>
                          <td className="text-center">
                            <input defaultChecked type="checkbox" />
                          </td>
                          <td className="text-center">
                            <input type="checkbox" />
                          </td>
                          <td className="text-center">
                            <input type="checkbox" />
                          </td>
                        </tr>
                        <tr>
                          <td>Timing Sheets</td>
                          <td className="text-center">
                            <input defaultChecked type="checkbox" />
                          </td>
                          <td className="text-center">
                            <input defaultChecked type="checkbox" />
                          </td>
                          <td className="text-center">
                            <input defaultChecked type="checkbox" />
                          </td>
                          <td className="text-center">
                            <input defaultChecked type="checkbox" />
                          </td>
                          <td className="text-center">
                            <input type="checkbox" />
                          </td>
                          <td className="text-center">
                            <input type="checkbox" />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="submit-section">
                    <button className="btn btn-primary submit-btn">Save</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* /Edit Employee Modal */}
        {/* Delete Employee Modal */}
        <div className="modal custom-modal fade" id="delete_employee" role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <div className="form-header">
                  <h3>Delete Employee</h3>
                  <p>Are you sure want to delete?</p>
                </div>
                <div className="modal-btn delete-action">
                  <div className="row">
                    <div className="col-6">
                      <a href="" className="btn btn-primary continue-btn">Delete</a>
                    </div>
                    <div className="col-6">
                      <a href="" data-dismiss="modal" className="btn btn-primary cancel-btn">Cancel</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Delete Employee Modal */}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    companyList: state.allEmployees.companyList,
    departmentList: state.allEmployees.departmentList,
    designationList: state.allEmployees.designationList,
    module_permission: state.allEmployees.module_permission,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getCompany: (data) => dispatch(allEmployeesAction.getCompanyList(data)),
    getDepartment: (data) => dispatch(allEmployeesAction.getDepartmentList(data)),
    getDesignation: (data) => dispatch(allEmployeesAction.getDesignationList(data)),
    getModulePermission: (data) => dispatch(allEmployeesAction.getModulePermission(data)),
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(Employee);
