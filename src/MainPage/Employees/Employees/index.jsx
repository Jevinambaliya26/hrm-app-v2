/**
 * Crm Routes
 */
/* eslint-disable */
import React from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { GuardedRoute, GuardProvider } from 'react-router-guards';

import AllEmployees from './allemployees';
import AllEmployeesList from './employeeslist';
import Holidays from './holidays';
import LeaveAdmin from './leave_admin';
import LeaveEmployee from './leaveemployee';
import Leavesetting from './leavesettings';
import AttendanceAdmin from './attendanceadmin';
import AttendanceEmployee from './attendanceemployee';
import Department from './department';
import Designation from './designation';
import Timesheet from './timesheet';
import Overtime from './overtime';
import { requireLogin } from '../../../libs/auth';

import dummyEmployee from '../../../libs/dummyEmployee';

const employee = dummyEmployee.find(e => e.email === localStorage.getItem("email"));
console.log(employee);

const EmployeesRoute = ({ match }) => (
   <GuardProvider guards={[requireLogin]}>
      <Switch>
         <Redirect exact from={`${match.url}/`} to={`${match.url}/allemployees`} />
         <GuardedRoute path={`${match.url}/allemployees`} component={AllEmployees} />
         <GuardedRoute path={`${match.url}/employees-list`} component={AllEmployeesList} />
         <GuardedRoute path={`${match.url}/holidays`} component={Holidays} meta={{ read: employee.holidays.read }} />
         <GuardedRoute path={`${match.url}/leaves-admin`} component={LeaveAdmin} meta={{ read: employee.adminLeaves.read }} />
         <GuardedRoute path={`${match.url}/leaves-employee`} component={LeaveEmployee} meta={{ read: employee.employeeLeaves.read }} />
         <GuardedRoute path={`${match.url}/leave-settings`} component={Leavesetting} meta={{ read: employee.leavesSetting.read }} />
         <GuardedRoute path={`${match.url}/attendance-admin`} component={AttendanceAdmin} meta={{ read: employee.attendanceAdmin.read }} />
         <GuardedRoute path={`${match.url}/attendance-employee`} component={AttendanceEmployee} meta={{ read: employee.attendanceEmployee.read }}  />
         <GuardedRoute path={`${match.url}/departments`} component={Department} meta={{ read: employee.department.read }} />
         <GuardedRoute path={`${match.url}/designations`} component={Designation} meta={{ read: employee.designation.read }} />
         <GuardedRoute path={`${match.url}/timesheet`} component={Timesheet} meta={{ read: employee.timeSheet.read }} />
         <GuardedRoute path={`${match.url}/overtime`} component={Overtime} meta={{ read: employee.overtime.read }} />
      </Switch>
   </GuardProvider>
);

export default EmployeesRoute;
