<?php

namespace CDI13\DatabaseBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;

use CDI13\DatabaseBundle\Ressources;

class DefaultController extends Controller
{
    public function getSubjectsAction(Request $request)
    {
    	if ($request->isXmlHttpRequest()) {
	    	$database = new Database();
	        return new Response($database->getSubjects());
    	}

    	else
    		return new Response("false");
    }

    public function getLinksAction(Request $request)
    {
        if ($request->isXmlHttpRequest()) {
            $database = new Database();
            return new Response($database->getLinks($request->get('subject_id')));
        }

        else
            return new Response("false");
    }

    public function getMarkdownAction(Request $request) {
        if ($request->isXmlHttpRequest()) {
            $database = new Database();
            return new Response($database->getMarkdown($request->get('link_id')));
        }

        else
            return new Response("false");
    }

    public function searchLinksAction(Request $request)
    {
        if ($request->isXmlHttpRequest()) {
            $database = new Database();
            return new Response($database->searchLinks($request->get('search_string')));
        }

        else
            return new Response("false");
    }

    public function addLinkAction(Request $request)
    {
    	if ($request->isXmlHttpRequest()) {
            $database = new Database();
            return new Response($database->addLink($request->get('url')));
        }

        else
            return new Response("false");
    }
}
