// ----------------------------------------------------------------------

const ROOTS = {
  DASHBOARD: '/quan-ly',
};

// ----------------------------------------------------------------------

export const paths = {
  page403: '/error/403',
  page404: '/error/404',
  page500: '/error/500',
  auth: {
    login: `/dang-nhap`,
    register: `/dang-ky`,
  },
  dashboard: {
    root: `${ROOTS.DASHBOARD}`,
    sale: {
      root: `${ROOTS.DASHBOARD}/ban-hang`,
    },
    account: {
      root: `${ROOTS.DASHBOARD}/quan-ly-tai-khoan`,
      list: `${ROOTS.DASHBOARD}/quan-ly-tai-khoan/danh-sach-tai-khoan`,
    },
    staff: {
      root: `${ROOTS.DASHBOARD}/quan-ly-nhan-vien`,
      list: `${ROOTS.DASHBOARD}/quan-ly-nhan-vien/danh-sach-nhan-vien`,
    },
    logsystem: {
      root: `${ROOTS.DASHBOARD}/nhat-ky-he-thong`,
      login: `${ROOTS.DASHBOARD}/nhat-ky-he-thong/nhat-ky-truy-cap`,
      search: `${ROOTS.DASHBOARD}/nhat-ky-he-thong/tra-cuu-tai-khoan`,
    },
    permission: {
      root: `${ROOTS.DASHBOARD}/quan-ly-chuc-nang`,
      group: `${ROOTS.DASHBOARD}/quan-ly-chuc-nang/cac-nhom-chuc-nang`,
      list: `${ROOTS.DASHBOARD}/quan-ly-chuc-nang/danh-sach-chuc-nang`,
    },
    role: {
      root: `${ROOTS.DASHBOARD}/quan-ly-quyen-han`,
      list: `${ROOTS.DASHBOARD}/quan-ly-quyen-han/danh-sach-quyen-han`,
      grant: `${ROOTS.DASHBOARD}/quan-ly-quyen-han/cap-quyen-nguoi-dung`,
    },
    table: {
      root: `${ROOTS.DASHBOARD}/quan-ly-phong-ban`,
      list: `${ROOTS.DASHBOARD}/quan-ly-phong-ban/danh-sach-phong-ban`,
    },
    product: {
      root: `${ROOTS.DASHBOARD}/quan-ly-san-pham`,
      category: `${ROOTS.DASHBOARD}/quan-ly-san-pham/danh-muc-san-pham`,
      list: `${ROOTS.DASHBOARD}/quan-ly-san-pham/danh-sach-san-pham`,
    },
    order: {
      root: `${ROOTS.DASHBOARD}/quan-ly-don-hang`,
      list: `${ROOTS.DASHBOARD}/quan-ly-don-hang/danh-sach-don-hang`,
      cancel: `${ROOTS.DASHBOARD}/quan-ly-don-hang/danh-sach-da-huy`,
    },

    exam: {
      root: `${ROOTS.DASHBOARD}/online-exam`,
      start: `${ROOTS.DASHBOARD}/online-exam/start`,
      list: `${ROOTS.DASHBOARD}/online-exam/list`,
      questions: `${ROOTS.DASHBOARD}/online-exam/questions`,
    },
    transcript: {
      root: `${ROOTS.DASHBOARD}/transcript`,
      total: `${ROOTS.DASHBOARD}/transcript/total`,
    },
    class: `${ROOTS.DASHBOARD}/class`,
    student: `${ROOTS.DASHBOARD}/student`,
  },
};
