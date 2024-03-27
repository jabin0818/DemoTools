import { Navigate } from "react-router-dom";
import Index from "@/pages/index";
import Mine from "@/pages/mine";
import Share from "@/pages/share";
import Star from "@/pages/star";
import GameList from "@/pages/index/child-pages/game";
import StarList from "@/pages/index/child-pages/star";
import StudyList from "@/pages/index/child-pages/study";
import ToolList from "@/pages/index/child-pages/toolList";
import TestList from "@/pages/index/child-pages/testList";
import Navi from "@/pages/index/child-pages/navi";
import DemoChainMap from "@/pages/demo/demo-chinaMap";
import DemoPiano from "@/pages/demo/demo-piano";
import DemoDictCard from "@/pages/demo/demo-dictCard";
import DemoDraw from "@/pages/demo/demo-draw";
import Diagrams from "@/pages/demo/demo-draw/child-pages/diagrams";
import Diagramming from "@/pages/demo/demo-draw/child-pages/diagramming";

import Activation from "@/pages/global/activation";
import Error from "@/pages/global/error";

const routes = [
    {
        path: '/index',
        element: <Index />,
        children: [
            // {
            //     path: "",
            //     element: <Navigate to="/tool" />
            // },
            {
                path: "game",
                element: <GameList />
            },
            {
                path: "star",
                element: <StarList />
            },
            {
                path: "study",
                element: <StudyList />
            },
            {
                path: "tool",
                element: <ToolList />
            },
            {
                path: "navi",
                element: <Navi />
            },
            {
                path: "test",
                element: <TestList />
            },
            {
                path: "",
                element: <Navigate to="tool" replace />
            }
        ]
    },
    {
        path: '/mine',
        element: <Mine />
    },
    {
        path: '/share',
        element: <Share />
    },
    {
        path: '/star',
        element: <Star />
    },
    {
        path: '/activation',
        element: <Activation />
    },
    {
        path: '/demo/chainMap',
        element: <DemoChainMap />
    },
    {
        path: '/demo/piano',
        element: <DemoPiano />
    },
    {
        path: '/demo/dictCard',
        element: <DemoDictCard />
    },
    {
        path: '/demo/draw',
        element: <DemoDraw />,
        children: [
            {
                path: "history",
                element: <Diagrams />
            },
            {
                path: "template_create",
                element: <Diagrams />
            },
            {
                path: "diagrams",
                element: <Diagrams />
            },
            {
                path: "fav",
                element: <Diagrams />
            },
            {
                path: "my_template",
                element: <Diagrams />
            },
            {
                path: "template_community",
                element: <Diagrams />
            },
            {
                path: "trash",
                element: <Diagrams />
            },
            {
                path: "",
                element: <Navigate to="history" replace />
            }
        ]
    },
    {
        path: '/demo/draw/diagramming/:id',
        element: <Diagramming />
    },
    {
        path: '/demo/draw/diagramTemp/:id',
        element: <Diagramming />
    },
    {
        path: '*',
        element: <Error />
    },
    {
        path: '/',
        element: <Navigate to="/index" />
    },
]

export default routes