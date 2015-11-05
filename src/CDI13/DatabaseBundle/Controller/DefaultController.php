<?php

namespace CDI13\DatabaseBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;

use CDI13\DatabaseBundle\Ressources;

class DefaultController extends Controller
{
    public function getSubjectsAction(Request $request) // TODO
    {
    	if ($request->isXmlHttpRequest()) {
	    	$database = new Database();
	        return new Response($database->getSubjects());
    	}

    	else
    		return new Response("false");
    }

    public function getLinksAction() // TODO
    {
        return new Response("getLinks");
    }

    public function searchLinksAction() // TODO
    {
        return new Response("searchLinks");
    }

    public function addSubjectAction() // TODO
    {
        return new Response("addSubject");
    }

    public function addLinkAction() // TODO
    {
    	return new Response("addLink");
    }
}