interface RoutesProps {
 root: string;
 update: string;
};

const SwitchRoutes: RoutesProps = {
    root: '/',
    update: '/update/:id'
};

export const { root, update } = SwitchRoutes;