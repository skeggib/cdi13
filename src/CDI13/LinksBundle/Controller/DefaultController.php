<?php

namespace CDI13\LinksBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('CDI13LinksBundle:Default:index.html.twig');
    }
}
