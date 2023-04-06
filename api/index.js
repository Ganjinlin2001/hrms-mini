import request from '../utils/request';
import method from '../utils/method';
// 员工注册接口
export function register(data) {
  return request({
    url: '/api/staff/register',
    method: method.POST,
    data,
  })
}

// 员工登录接口
export function login(data) {
  return request({
    url: '/api/staff/login',
    method: method.POST,
    data,
  })
}

// 更新员工信息
export function updateStaffInfo(data) {
  // console.log('data: ', data);
  return request({
    url: '/api/staff/staffUpdate',
    method: method.POST,
    data,
  })
}

// 获取员工信息
export function getStaffInfo(data) {
  return request({
    url: '/api/staff/getStaffInfo',
    method: method.GET,
    data,
  })
}

// 添加一条员工的调岗申请
export function addStaffJobApply(data) {
  return request({
    url: '/api/job/add',
    method: method.POST,
    data,
  })
}

// 获取员工所有的调岗记录
export function getStaffJobRecord(data) {
  request({
    url: '/api/job/getStaffAll',
    method: method.GET,
    data,
  })
}

// 获取员工最新的调岗记录
export async function getStaffLateRecord(data) {
  return await request({
    url: '/api/job/getLate',
    method: method.GET,
    data,
  })
}

// 取消调岗申请
export function cancelJobApply(data) {
  request({
    url: '/api/job/cancelJobApply',
    method: method.POST,
    data,
  })
}

// 新增一条员工宿舍调换申请
export function addStaffDormitoryApply(data) {
  request({
    url: '/api/dormitory/add',
    method: method.POST,
    data,
  })
}

// 取消员工的宿舍调换申请
export function cancelDormitoryApply(data) {
  request({
    url: '/api/dormitory/cancel',
    method: method.POST,
    data,
  })
}

// 提交部门调换申请
export function addStaffDepartmentApply(data) {
  request({
    url: '/api/department/add',
    method: method.POST,
    data,
  })
}

// 取消部门调换申请
export function cancelDepartmentApply(data) {
  request({
    url: '/api/department/cancel',
    method: method.POST,
    data,
  })
}

// 离职相关
export async function getStaffLateLeaveRecord(data) {
  return await request({
    url: '/api/leave/getLateRecord',
    method: method.GET,
    data,
  });
}

export function staffLeaveApply(data) {
  request({
    url: '/api/leave/add',
    method: method.POST,
    data,
  });
}

export function cancelLeaveApply(data) {
  request({
    url: '/api/leave/cancel',
    method: method.POST,
    data,
  });
}


// 请假相关
// 获取某个员工所有的请假记录
export async function getStaffAllVacateRecord(data) {
  const res = await request({
    url: '/api/vacate/getStaffAllVacateRecord',
    method: method.GET,
    data,
  });
  return res;
}

// 获取员工最近审批的请假记录
export async function getStaffLateVacateRecord(data) {
  return await request({
    url: '/api/vacate/getStaffLateVacateRecord',
    method: method.GET,
    data,
  });
}

// 创建新的请假申请
export function addStaffVacateApply(data) {
  request({
    url: '/api/vacate/addStaffVacateApply',
    method: method.POST,
    data,
  });
}

// 取消请假申请
export function cancelVacateApply(data) {
  request({
    url: '/api/vacate/cancel',
    method: method.POST,
    data,
  })
}


// 考勤相关接口
export async function getStaffAllAttendanceRecord(data) {
  return await request({
    url: '/api/attendance/getStaffAllAttendanceRecord',
    method: method.GET,
    data,
  })
}

export async function getStaffTodayAttendanceRecord(data) {
  return await request({
    url: '/api/attendance/getStaffTodayAttendanceRecord',
    method: method.GET,
    data,
  })
}

export function addStaffAttendanceRecord(data) {
  request({
    url: '/api/attendance/add',
    method: method.POST,
    data,
  })
}

export function updateStaffAttendanceInfo(data) {
  request({
    url: '/api/attendance/updateStaffAttendanceInfo',
    method: method.POST,
    data,
  })
}