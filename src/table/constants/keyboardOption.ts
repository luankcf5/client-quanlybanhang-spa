export const keyboardOption = [
  {
    label: 'Di chuyển giữa các ô, các hàng',
    items: [
      {
        keys: 'Mũi tên trái',
        description: 'Di chuyển sang bên trái giữa các ô',
      },
      {
        keys: 'Mũi tên phải',
        description: 'Di chuyển sang bên phải giữa các ô',
      },
      {
        keys: 'Mũi tên lên',
        description: 'Di chuyển lên bên trên giữa các ô',
      },
      {
        keys: 'Mũi tên xuống',
        description: 'Di chuyển xuống bên dưới giữa các ô',
      },
      {
        keys: 'Home',
        description: 'Di chuyển đến ô đầu tiên của hàng hiện tại',
      },
      {
        keys: 'End',
        description: 'Di chuyển đến ô cuối cùng của hàng hiện tại',
      },
      {
        keys: 'Ctrl + Home',
        description: 'Di chuyển đến ô đầu tiên của hàng đầu tiên',
      },
      {
        keys: 'Ctrl + End',
        description: 'Di chuyển đến ô cuối cùng của hàng cuối cùng',
      },
      {
        keys: 'Space',
        description: 'Di chuyển hàng tiếp theo có thể kéo đến',
      },
      {
        keys: 'Page Up',
        description: 'Di chuyển đến hàng tiếp theo',
      },
      {
        keys: 'Page Down',
        description: 'Di chuyển đến hàng kéo đến tiếp theo',
      },
      {
        keys: 'Space',
        description: 'Mở rộng các hàng con của hàng hiện tại',
      },
    ],
  },
  {
    label: 'Lựa chọn các hàng dữ liệu',
    items: [
      {
        keys: 'Shift + Space',
        description: 'Lựa chọn hàng hiện tại',
      },
      {
        keys: 'Shift + Mũi tên lên/xuống',
        description: 'Lựa chọn hàng hiện tại và hàng trên/dưới',
      },
      {
        keys: 'Shift + Click vào hàng',
        description: 'Lựa chọn hàng hiện tại tới hàng được click',
      },
      {
        keys: 'Ctrl + A',
        description: 'Lựa chọn tất cả các hàng',
      },
      {
        keys: 'Ctrl + C',
        description: 'Sao chép các hàng đang được lựa chọn',
      },
      {
        keys: 'Ctrl + click vào hàng',
        description: 'Mở chế độ lựa chọn nhiều hàng cùng lúc',
      },
      {
        keys: 'Ctrl + click hàng đang chọn',
        description: 'Bỏ lựa chọn cho hàng được click',
      },
    ],
  },
  {
    label: 'Sắp xếp các hàng dữ liệu',
    items: [
      {
        keys: 'Shift + click vào tên hàng',
        description: 'Sắp xếp dữ liệu theo tên hàng được click',
      },
      {
        keys: 'Ctrl + click vào tên hàng',
        description: 'Đảo ngược sắp xếp theo tên hàng được click',
      },
      {
        keys: 'Enter',
        description: 'Sắp xếp dữ liệu theo tên hàng đang chọn',
      },
      {
        keys: 'Shift + Enter',
        description: 'Đảo ngược sắp xếp theo tên hàng đang chọn',
      },
    ],
  },
];
